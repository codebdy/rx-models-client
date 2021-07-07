import { makeAutoObservable } from "mobx";
import { EntityMeta, EntityType } from "../meta/entity-meta";
import { ColumnStore } from "./column";
import { PackageStore } from "./package";
import { RelationStore } from "./relation";
import _ from 'lodash';
import { createId } from "util/creat-id";
import { ColumnType } from "../meta/column-meta";

export class EntityStore{
  id: string;
  name: string;
  entityType?: EntityType;
  package: PackageStore | undefined;
  columns: ColumnStore[];

  constructor(meta:EntityMeta, private rootStore: PackageStore, belongsTopackage?: PackageStore){
    this.id = meta.id;
    this.name = meta.name;
    this.entityType = meta.entityType;
    this.package = belongsTopackage;

    this.columns = meta.columns 
      ? meta.columns.map(column=>new ColumnStore(column))
      :[];
    
    makeAutoObservable(this)
  }

  setName(name:string){
    this.name = name;
  }

  setPackage(belongsToPackage:PackageStore){
    this.package = belongsToPackage;
  }

  createdColumn(){
    let index = 1;
    const namePrefix = 'newColumn';
    // eslint-disable-next-line no-loop-func
    while(this.columns.find(column=>column.name === namePrefix + index)){
      index ++
    }
    
    const columnStore = new ColumnStore({
      id:createId(),
      name: namePrefix + index,
      type: ColumnType.String,
    })

    this.columns.push(columnStore);

    return columnStore;
  }

  deleteColumn(id: string){
    _.remove(this.columns, column=>column.id === id);
  }

  insertColumn(columnStore: ColumnStore, index:number){
    this.columns.splice(index, 0, columnStore);
  }

  getColumnById(id:string){
    return this.columns.find(column=>column.id === id);
  }

  getSourceRelations():RelationStore[]{
    const relations: RelationStore[] = [];
    this.rootStore.relations.forEach(relation=>{
      if(relation.sourceId === this.id){
        relations.push(relation)
      }
    });
    return relations;
  }

  getTargetRelations():RelationStore[]{
    const relations: RelationStore[] = [];
    this.rootStore.relations.forEach(relation=>{
      if(relation.targetId === this.id){
        relations.push(relation)
      }
    });
    return relations;
  }

  toMeta(){
    return {
      id: this.id,
      name: this.name,
      classType: this.entityType,
      columns: this.columns.map(column=>column.toMeta()),
    }
  }
}