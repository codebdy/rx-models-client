import { makeAutoObservable } from "mobx";
import { PackageMeta, PackageStatus } from "../meta/package-meta";
import { EntityStore } from "./entity-store";
import { DiagramStore } from "./diagram";
import { RelationStore } from "./relation";
import { EntityMeta } from "../meta/EntityMeta";
import _ from 'lodash';
import { EntityBoardStore } from "./entity-board-store";

export class PackageStore{
  id?: number;
  uuid: string;
  name: string;
  entities: EntityStore[] = [];
  diagrams: DiagramStore[] = [];
  relations: RelationStore[] = [];
  status: PackageStatus;
  
  constructor(meta:PackageMeta, public rootStore: EntityBoardStore){
    this.id = meta.id;
    this.uuid = meta?.uuid;
    this.name = meta?.name;
    this.entities = meta?.entities?.map(meta=>new EntityStore(meta, this.rootStore, this))||[];
    this.diagrams = meta?.diagrams?.map(meta=>new DiagramStore(meta, this.rootStore, this))||[];
    this.relations = meta?.relations?.map(meta=>new RelationStore(meta, this))||[];
    this.status = meta.status;
    makeAutoObservable(this)
  }

  setName(name:string){
    this.name = name;
  }

  getEntityByName(name:string): EntityStore|undefined{
    const entityStore = this.entities.find(entityStore=>entityStore.name === name);
    if(entityStore){
      return entityStore;
    }
  }  

  getEntityById(uuid:string): EntityStore|undefined{
    const entityStore = this.entities.find(entityStore=>entityStore.uuid === uuid);
    if(entityStore){
      return entityStore;
    }
  }

  getDiagramByName(name:string): DiagramStore|undefined{
    const diagramStore = this.diagrams.find(diagStore=>diagStore.name === name);
    if(diagramStore){
      return diagramStore;
    }
    return undefined;
  }

  getDiagramById(id?:string): DiagramStore|undefined{
    const diagramStore = this.diagrams.find(diagStore=>diagStore.uuid === id);
    if(diagramStore){
      return diagramStore;
    }
    return undefined;
  }

  getRelationById(id: string){
    return this.relations.find(relation=>relation.uuid === id);
  }

  addDiagram(diagramStore: DiagramStore){
    this.diagrams.push(diagramStore);
  }

  insertEntity(entityStore: EntityStore, index:number){
    this.entities.splice(index, 0, entityStore);
  }


  insertDiagram(diagramStore: DiagramStore, index:number){
    this.diagrams.splice(index, 0, diagramStore);
  }

  deleteDiagram(id:string){
    _.remove(this.diagrams, (diagramStore)=> diagramStore.uuid === id);
  }

  createNewEntity(entityMeta: EntityMeta){
    const newClass = new EntityStore(entityMeta, this.rootStore||this, this);
    this.entities.push(newClass);
    return newClass;
  }

  addEntity(entity:EntityStore){
    entity.package = this;
    this.entities.push(entity);
  }

  deleteEntity(id:string){
    _.remove(this.entities, (entityStore)=> entityStore.uuid === id);
  }

  addRelation(relation: RelationStore){
    relation.setPakage(this);
    this.relations.push(relation);
    return relation;
  }

  deleteRelation(id:string){
    _.remove(this.relations, (relationStore)=> relationStore.uuid === id);
  }

  toMeta(): PackageMeta {
    return {
      id: this.id,
      uuid: this.uuid,
      name: this.name,
      entities: this.entities.map(entity=>entity.toMeta()),
      diagrams: this.diagrams.map(diagram=>diagram.toMeta()),
      relations: this.relations.map(relation=>relation.toMeta()),
      status: this.status,
    }
  }
}