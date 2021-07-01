import { makeAutoObservable } from "mobx";
import { PackageMeta } from "../meta/package-meta";
import { ClassStore } from "./class-store";
import { DiagramStore } from "./diagram";
import intl from "react-intl-universal";
import { RelationStore } from "./relation";
import { RootMeta } from "../meta/root-meta";

export class PackageStore{
  id: string;
  name: string;
  parent: PackageStore | undefined;
  children: PackageStore[] = [];
  classes: ClassStore[] = [];
  diagrams: DiagramStore[] = [];
  relations: RelationStore[] = [];
  
  constructor(meta?:PackageMeta, private rootStore?: PackageStore){
    this.id = meta?.id || 'root';
    this.name = meta?.name || intl.get('root-models');
    this.children = meta?.children.map(meta=>new PackageStore(meta, this.rootStore||this))||[];
    this.classes = meta?.classMetas.map(meta=>new ClassStore(meta, this.rootStore||this, this))||[];
    this.diagrams = meta?.diagramMetas.map(meta=>new DiagramStore(meta, this.rootStore||this))||[];
    makeAutoObservable(this)
  }

  initAsRoot(meta:RootMeta){
    this.children = meta.packageMetas?.map(meta=>new PackageStore(meta, this))||[];
    this.classes = meta.classMetas?.map(meta=>new ClassStore(meta, this))||[];
    this.diagrams = meta.diagramMetas?.map(meta=>new DiagramStore(meta, this))||[];
    this.relations = meta.relationMetas?.map(relation=>new RelationStore(relation, this));
  }

  getClassById(id:string): ClassStore|undefined{
    const classStore = this.classes.find(classStore=>classStore.id === id);
    if(classStore){
      return classStore;
    }

    for(const pkg of this.children){
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
    for(const pkg of this.children){
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

  }

  updatePackage(){

  }

  movePackage(){

  }

  deletePackage(){

  }

  addNewClass(){

  }

  updateClass(){

  }

  deleteClass(){

  }

  moveClass(){

  }

  updateClassName(){

  }

  addRelation(){

  }

  deleteRelation(){

  }
}