import { makeAutoObservable } from "mobx";
import { createId } from "util/creat-id";
import { EntityMeta, EntityType } from "../meta/entity-meta";
import { ColumnStore } from "./column";
import { PackageStore } from "./package";

export interface RelationOfClass{
  id: string;
  relationId: string;
  name: string;
}

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

  getRelations():RelationOfClass[]{
    const relations: RelationOfClass[] = [];
    this.rootStore.relations.forEach(relation=>{
      if(relation.sourceId === this.id){
        relations.push({
          id: createId(),
          relationId: relation.id,
          name: relation.roleOnSource
        })
      }
      if(relation.targetId === this.id){
        relations.push({
          id: createId(),
          relationId: relation.id,
          name: relation.roleOnTarget
        })
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