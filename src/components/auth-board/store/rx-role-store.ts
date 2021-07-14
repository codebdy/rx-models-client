import { makeAutoObservable } from "mobx";

export class RxRoleStore{
  constructor(){
    makeAutoObservable(this);
  }
}