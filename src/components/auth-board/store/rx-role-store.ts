import { RxAbility } from "entity-interface/rx-ability";
import { RxRole } from "entity-interface/rx-role";
import { makeAutoObservable } from "mobx";

export class RxRoleStore{
  id?: number;
  name: string;
  description: string;
  abilities?: RxAbility[]

  constructor(role:RxRole){
    this.id = role.id;
    this.name = role.name;
    this.description = role.description;
    this.abilities = role.abilities;
    makeAutoObservable(this);
  }
}