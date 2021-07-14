import { makeAutoObservable } from "mobx";
import { RxRoleStore } from "./rx-role-store";

export class AuthBoardStore{
  changed:boolean = false;
  selectRole?:RxRoleStore;

  constructor(){
    makeAutoObservable(this);
  }

  setChanged(changed:boolean){
    this.changed = changed;
  }

  setSelecRole(role?:RxRoleStore){
    this.selectRole = role;
  }
}