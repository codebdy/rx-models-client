import { makeAutoObservable } from "mobx";
import { ClassMeta } from "../meta/class-meta";
import { ColumnStore } from "./column";
import { PackageStore } from "./package";

export class ClassStore{
  id: string;
  name: string;
  package: PackageStore | undefined;
  columns: ColumnStore[];

  constructor(meta:ClassMeta, private rootStore: PackageStore, belongsTopackage?: PackageStore){
    this.id = meta.id;
    this.name = meta.name;
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

  toMeta(){
    return {
      id: this.id,
      name: this.name,
      columns: this.columns.map(column=>column.toMeta()),
    }
  }
}