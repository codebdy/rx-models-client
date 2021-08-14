import { makeAutoObservable } from "mobx";
import { EntityMeta, EntityType } from "../meta/entity-meta";
import { ColumnStore } from "./column";
import { PackageStore } from "./package";
import { RelationStore } from "./relation";
import _ from 'lodash';
import { ColumnType } from "../meta/column-meta";
import { EntityBoardStore } from "./entity-board-store";

export class EntityStore{
  uuid: string;
  name: string;
  tableName?: string;
  entityType?: EntityType|"";
  package: PackageStore | undefined;
  columns: ColumnStore[];
  enumValues: any;
  interfaceValues: any;

  constructor(meta:EntityMeta, private rootStore: EntityBoardStore, belongsTopackage?: PackageStore){
    this.uuid = meta.uuid;
    this.name = meta.name;
    this.tableName = meta.tableName;
    this.entityType = meta.entityType;
    this.package = belongsTopackage;
    this.enumValues = meta.enumValues;

    this.columns = meta.columns 
      ? meta.columns.map(column=>new ColumnStore(column, this))
      :[];
    
    makeAutoObservable(this)
  }

  setName(name:string){
    this.name = name;
  }

  setTableName(name:string|undefined){
    this.tableName = name||undefined;
  }

  setEnumValues(enumValues:any){
    this.enumValues = enumValues;
  }

  setType(type:EntityType|undefined|""){
    this.entityType = type;
  }

  setPackage(belongsToPackage:PackageStore){
    this.package = belongsToPackage;
  }

  setColumns(columns:ColumnStore[]){
    this.columns = columns;
  }

  createdColumn(id:string){
    let index = 1;
    const namePrefix = 'newColumn';
    // eslint-disable-next-line no-loop-func
    while(this.columns.find(column=>column.name === namePrefix + index)){
      index ++
    }
    
    const columnStore = new ColumnStore({
      uuid: id,
      name: namePrefix + index,
      type: ColumnType.String,
    }, this)

    this.columns.push(columnStore);

    return columnStore;
  }

  deleteColumn(id: string){
    _.remove(this.columns, column=>column.uuid === id);
  }

  insertColumn(columnStore: ColumnStore, index:number){
    this.columns.splice(index, 0, columnStore);
  }

  getColumnById(id:string){
    return this.columns.find(column=>column.uuid === id);
  }

  getSourceRelations():RelationStore[]{
    const relations: RelationStore[] = [];
    this.rootStore.getRelations().forEach(relation=>{
      if(relation.sourceId === this.uuid){
        relations.push(relation)
      }
    });
    return relations;
  }

  getTargetRelations():RelationStore[]{
    const relations: RelationStore[] = [];
    this.rootStore.getRelations().forEach(relation=>{
      if(relation.targetId === this.uuid){
        relations.push(relation)
      }
    });
    return relations;
  }

  toMeta(){
    return {
      uuid: this.uuid,
      name: this.name,
      tableName: this.tableName,
      entityType: this.entityType,
      columns: this.columns.map(column=>column.toMeta()),
      enumValues: this.enumValues,
    }
  }
}