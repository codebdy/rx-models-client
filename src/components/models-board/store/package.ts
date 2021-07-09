import { makeAutoObservable } from "mobx";
import { PackageMeta } from "../meta/package-meta";
import { EntityStore } from "./entity-store";
import { DiagramStore } from "./diagram";
import intl from "react-intl-universal";
import { RelationStore } from "./relation";
import { EntityMeta } from "../meta/entity-meta";
import _ from 'lodash';
import { TREE_ROOT_ID } from "util/consts";
import { ModelsBoardStore } from "./models-board";

export class PackageStore{
  uuid: string;
  name: string;
  entities: EntityStore[] = [];
  diagrams: DiagramStore[] = [];
  relations: RelationStore[] = [];
  
  constructor(meta:PackageMeta, public rootStore: ModelsBoardStore){
    this.uuid = meta?.uuid || TREE_ROOT_ID;
    this.name = meta?.name || intl.get('root-models');
    //this.packages = meta?.packages?.map(meta=>new PackageStore(meta, this, this.rootStore||this))||[];
    this.entities = meta?.entities?.map(meta=>new EntityStore(meta, this.rootStore, this))||[];
    this.diagrams = meta?.diagrams?.map(meta=>new DiagramStore(meta, this.rootStore, this))||[];
    this.relations = meta?.relations?.map(meta=>new RelationStore(meta, this))||[];
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

  getDiagramById(id:string): DiagramStore|undefined{
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

}