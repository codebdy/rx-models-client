import { EntityBoardStore } from "../store/entity-board-store";
import { PackageStore } from "../store/package";
import { convertType } from "./convert-type";
import _ from 'lodash';
import { RelationType } from "../meta/relation-meta";
import { saveAs } from 'file-saver';
import { EntityStore } from "../store/entity-store";
import { EntityType } from "../meta/entity-meta";
import { ColumnType } from "../meta/column-meta";

export class PackageSourceGenerator{
  constructor(
    private readonly packageStore: PackageStore, 
    private readonly rootStore:EntityBoardStore,
  ){
    
  }

  generate(){
    var JSZip = require("jszip");
    const zip = new JSZip();
    for(const entity of this.packageStore.entities){
      let source = entity.entityType === EntityType.ENUM ? this.generateEnumEntity(entity) : this.generateNormalEntity(entity);
      zip.file(entity.name + '.ts', source);
    }

    zip.generateAsync({type:"blob"})
    .then(function(content: string | Blob) {
      saveAs(content, "entity-interface.zip");
    }); 
  }

  private generateEnumEntity(entity: EntityStore) {
    let source = ''
    source = source + `export enum ${entity.name} {\n`
    for(const key in entity.enumValues||{}){
      source = source + `  ${key} = '${entity.enumValues[key]}',\n`
    }
    source = source + '}\n'
    return source;
  }

  private generateNormalEntity(entity: EntityStore) {
    const sourceRelations = entity.getSourceRelations();
    const targetRelations = entity.getTargetRelations();
    let source = '';
    const enumEntities = this.rootStore.getEnumEntities();
    const sourceImports = sourceRelations
      .filter(relation => relation.targetId !== entity.uuid)
      .map(relation => {
        const entityName = this.rootStore.getEntityById(relation.targetId)?.name;
        return `import { ${entityName} } from './${entityName}'`;
      });
    const targetImports = targetRelations
      .filter(relation => relation.sourceId !== entity.uuid)
      .map(relation => {
        const entityName = this.rootStore.getEntityById(relation.sourceId)?.name;
        return `import { ${entityName} } from './${entityName}'`;
      });
    const enumImports = entity.columns.filter(column => column.type === ColumnType.Enum)
      .map(column=>{
        const enumEntity = enumEntities.find(entity=>entity.uuid === column.enumEnityUuid);
        return enumEntity ? `import { ${enumEntity?.name} } from './${enumEntity?.name}'` : '';
      })
    source = source + _.uniq(sourceImports.concat(targetImports).concat(enumImports)).join('\n');
    source = source + ((sourceImports.length + targetImports.length) > 0 ? '\n\n' : '');
    source = source + `export interface ${entity.name}{\n`;
    source = source + entity.columns.map(column => {
      if (column.name === 'id') {
        return `  id?: number;`;
      }
      return `  ${column.name}${column.nullable ? '?' : ''}: ${convertType(column, enumEntities)};`;
    }).join('\n');

    source = source + (targetRelations.length > 0 ? '\n' : '');
    source = source + targetRelations.map(relation => {
      const arraySymbal = relation.relationType === RelationType.MANY_TO_ONE || relation.relationType === RelationType.MANY_TO_MANY
        ? '[]'
        : '';
      return `  ${relation.roleOnTarget}?: ${this.rootStore.getEntityById(relation.sourceId)?.name}${arraySymbal}`;
    }).join('\n');

    source = source + (sourceRelations.length > 0 ? '\n' : '');

    source = source + sourceRelations.map(relation => {
      const arraySymbal = relation.relationType === RelationType.ONE_TO_MANY || relation.relationType === RelationType.MANY_TO_MANY
        ? '[]'
        : '';
      return `  ${relation.roleOnSource}?: ${this.rootStore.getEntityById(relation.targetId)?.name}${arraySymbal}`;
    }).join('\n');

    source = source + '\n}';
    return source;
  }
}