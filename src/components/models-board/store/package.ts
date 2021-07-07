import { makeAutoObservable } from "mobx";
import { PackageMeta } from "../meta/package-meta";
import { EntityStore } from "./entity-store";
import { DiagramStore } from "./diagram";
import intl from "react-intl-universal";
import { RelationStore } from "./relation";
import { RootMeta } from "../meta/root-meta";
import { createId } from "util/creat-id";
import { seedId } from "util/seed-id";
import { EntityMeta } from "../meta/entity-meta";
import _ from 'lodash';

export class PackageStore{
  id: string;
  name: string;
  parent: PackageStore | undefined;
  packages: PackageStore[] = [];
  entities: EntityStore[] = [];
  diagrams: DiagramStore[] = [];
  relations: RelationStore[] = [];
  
  constructor(meta?:PackageMeta, private rootStore?: PackageStore){
    this.id = meta?.id || 'root';
    this.name = meta?.name || intl.get('root-models');
    this.packages = meta?.packages?.map(meta=>new PackageStore(meta, this.rootStore||this))||[];
    this.entities = meta?.entityMetas?.map(meta=>new EntityStore(meta, this.rootStore||this, this))||[];
    this.diagrams = meta?.diagramMetas?.map(meta=>new DiagramStore(meta, this.rootStore||this, this))||[];
    makeAutoObservable(this)
  }

  initAsRoot(meta:RootMeta){
    this.packages = meta.packageMetas?.map(meta=>new PackageStore(meta, this))||[];
    this.entities = meta.classMetas?.map(meta=>new EntityStore(meta, this))||[];
    this.diagrams = meta.diagramMetas?.map(meta=>new DiagramStore(meta, this, this))||[];
    this.relations = meta.relationMetas?.map(relation=>new RelationStore(relation, this));
  }

  setName(name:string){
    this.name = name;
  }

  getEntityById(id:string): EntityStore|undefined{
    const entityStore = this.entities.find(entityStore=>entityStore.id === id);
    if(entityStore){
      return entityStore;
    }

    for(const pkg of this.packages){
      const clsStore = pkg.getEntityById(id);
      if(clsStore){
        return clsStore;
      }
    }
  }

  getDiagramById(id:string): DiagramStore|undefined{
    const diagramStore = this.diagrams.find(diagStore=>diagStore.id === id);
    if(diagramStore){
      return diagramStore;
    }
    for(const pkg of this.packages){
      const diagStore = pkg.getDiagramById(id);
      if(diagStore){
        return diagStore;
      }
    }
    return undefined;
  }

  getRelationById(id: string){
    return this.relations.find(relation=>relation.id === id);
  }

  setParent(parent:PackageStore){
    this.parent = parent;
  }

  addNewPackage(){
    const packageStore = new PackageStore(
      {
        id:createId(), 
        name:intl.get('add-package') + seedId(),
      }, 
      this.rootStore||this
    );
    this.packages.push(packageStore);
    return packageStore;
  }


  deletePackage(id:string){
    _.remove(this.packages, (packageStore)=> packageStore.id === id);
  }

  addNewEntity(entityMeta: EntityMeta){
    const newClass = new EntityStore(entityMeta, this.rootStore||this, this);
    this.entities.push(newClass);
    return newClass;
  }

  deleteEntity(id:string){
    _.remove(this.entities, (entityStore)=> entityStore.id === id);
  }

  //只供根节点使用
  addNewRelation(relation: RelationStore){
    this.relations.push(relation);
    return relation;
  }

  deleteRelation(id:string){
    _.remove(this.relations, (relationStore)=> relationStore.id === id);
  }

}