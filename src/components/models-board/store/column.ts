import { makeAutoObservable } from "mobx";
import { ColumnMeta, ColumnType } from "../meta/column-meta";
import { EntityStore } from "./entity-store";

export class ColumnStore{
  uuid: string;
  name: string;
  type: ColumnType;
  primary?: boolean;
  generated?: boolean;
  
  constructor(meta:ColumnMeta, public readonly entityStore: EntityStore){
    this.uuid = meta.uuid;
    this.name = meta.name;
    this.type = meta.type;
    this.primary = meta.primary;
    this.generated = meta.generated;
    makeAutoObservable(this)
  }

  setName(name:string){
    this.name = name;
  }

  toMeta(): ColumnMeta{
    return {
      uuid: this.uuid,
      name: this.name,
      type: this.type,
      primary: this.primary,
      generated: this.generated
    }
  }
}