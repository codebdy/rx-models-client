import { makeAutoObservable } from "mobx";
import { EntityMeta, EntityType } from "../meta/entity-meta";
import { ColumnStore } from "./column";
import { PackageStore } from "./package";
import { RelationStore } from "./relation";
import _ from 'lodash';
import { ColumnType } from "../meta/column-meta";
import { ModelsBoardStore } from "./models-board";

export class EntityStore{
  uuid: string;
  name: string;
  entityType?: EntityType;
  package: PackageStore | undefined;
  columns: ColumnStore[];

  constructor(meta:EntityMeta, private rootStore: ModelsBoardStore, belongsTopackage?: PackageStore){
    this.uuid = meta.uuid;
    this.name = meta.name;
    this.entityType = meta.entityType;
    this.package = belongsTopackage;

    this.columns = meta.columns 
      ? meta.columns.map(column=>new ColumnStore(column, this))
      :[];
    
    makeAutoObservable(this)
  }

  setName(name:string){
    this.name = name;
  }

  setPackage(belongsToPackage:PackageStore){
    this.package = belongsToPackage;
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
      id: this.uuid,
      name: this.name,
      classType: this.entityType,
      columns: this.columns.map(column=>column.toMeta()),
    }
  }
}