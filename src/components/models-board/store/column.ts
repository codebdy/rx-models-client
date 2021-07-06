import { makeAutoObservable } from "mobx";
import { ColumnMeta, ColumnType } from "../meta/column-meta";

export class ColumnStore{
  id: string;
  name: string;
  type: ColumnType;
  primary?: boolean;
  generated?: boolean;
  
  constructor(meta:ColumnMeta){
    this.id = meta.id;
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
      id: this.id,
      name: this.name,
      type: this.type,
      primary: this.primary,
      generated: this.generated
    }
  }
}