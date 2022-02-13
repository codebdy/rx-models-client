import { makeAutoObservable } from "mobx";
import { RxRoleStore } from "./rx-role-store";

export class AuthBoardStore{
  changed:boolean = false;
  selectRole?:RxRoleStore;
  // packages: PackageMeta[] = [];

  constructor(){
    makeAutoObservable(this);
  }

  setChanged(changed:boolean){
    this.changed = changed;
  }

  setSelecRole(role?:RxRoleStore){
    this.selectRole = role;
  }

  // setPackages(packages: PackageMeta[]){
  //   this.packages = packages;
  // }
}