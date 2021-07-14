import { RxAbility } from "entity-interface/rx-ability";
import { RxRole } from "entity-interface/rx-role";
import { makeAutoObservable, toJS } from "mobx";

export class RxRoleStore{
  id?: number;
  name: string;
  description: string;
  abilities?: RxAbility[]

  constructor(role:RxRole){
    this.id = role.id;
    this.name = role.name;
    this.description = role.description;
    this.abilities = role.abilities || [];
    makeAutoObservable(this);
  }

  upateAbility(ability:RxAbility){
    this.removeAbiltiy(ability);
    this.abilities?.push(ability);
  }

  removeAbiltiy(ability:RxAbility){
    this.abilities = this.abilities?.filter(
      ablt => {
        return ablt.entityUuid !== ability.entityUuid 
        || ablt.columnUuid !== ability.columnUuid 
        || ablt.abilityType !== ability.abilityType
      }

    ) || [];
  }

  toMeta(){
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      abilities: toJS(this.abilities)
    }
  }
}