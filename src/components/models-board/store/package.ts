import { makeAutoObservable } from "mobx";
import { PackageMeta } from "../meta/package-meta";
import { ClassStore } from "./class-store";
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
  classes: ClassStore[] = [];
  diagrams: DiagramStore[] = [];
  relations: RelationStore[] = [];
  
  constructor(meta?:PackageMeta, private rootStore?: PackageStore){
    this.id = meta?.id || 'root';
    this.name = meta?.name || intl.get('root-models');
    this.packages = meta?.packages?.map(meta=>new PackageStore(meta, this.rootStore||this))||[];
    this.classes = meta?.classMetas?.map(meta=>new ClassStore(meta, this.rootStore||this, this))||[];
    this.diagrams = meta?.diagramMetas?.map(meta=>new DiagramStore(meta, this.rootStore||this, this))||[];
    makeAutoObservable(this)
  }

  initAsRoot(meta:RootMeta){
    this.packages = meta.packageMetas?.map(meta=>new PackageStore(meta, this))||[];
    this.classes = meta.classMetas?.map(meta=>new ClassStore(meta, this))||[];
    this.diagrams = meta.diagramMetas?.map(meta=>new DiagramStore(meta, this, this))||[];
    this.relations = meta.relationMetas?.map(relation=>new RelationStore(relation, this));
  }

  setName(name:string){
    this.name = name;
  }

  getClassById(id:string): ClassStore|undefined{
    const classStore = this.classes.find(classStore=>classStore.id === id);
    if(classStore){
      return classStore;
    }

    for(const pkg of this.packages){
      const clsStore = pkg.getClassById(id);
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
    const newClass = new ClassStore(entityMeta, this.rootStore||this, this);
    this.classes.push(newClass);
    return newClass;
  }



  deleteClass(id:string){
    _.remove(this.classes, (classStore)=> classStore.id === id);
  }

}