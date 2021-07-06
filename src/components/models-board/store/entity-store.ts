import { makeAutoObservable } from "mobx";
import { EntityMeta, EntityType } from "../meta/entity-meta";
import { ColumnStore } from "./column";
import { PackageStore } from "./package";
import { RelationStore } from "./relation";

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