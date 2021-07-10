import { makeAutoObservable } from "mobx";
import { ColumnMeta, ColumnType } from "../meta/column-meta";
import { EntityStore } from "./entity-store";

export class ColumnStore{
  uuid: string;
  name: string;
  type: ColumnType;
  primary?: boolean;
  generated?: boolean;
  createDate?: boolean;
  updateDate?: boolean;
  deleteDate?: boolean;
  version?: boolean;
  length?: string | number;
  width?: number;
  nullable?: boolean;
  readonly?: boolean;
  select?: boolean;
  unique?: boolean;
  comment?: string;
  default?: any;
  precision?: number;
  scale?: number;

  constructor(meta:ColumnMeta, public readonly entityStore: EntityStore){
    this.uuid = meta.uuid;
    this.name = meta.name;
    this.type = meta.type;
    this.primary = meta.primary;
    this.generated = meta.generated;
    this.createDate = meta.createDate;
    this.updateDate = meta.updateDate;
    this.deleteDate = meta.deleteDate;
    this.version = meta.version;
    this.length = meta.length;
    this.width = meta.width;
    this.nullable = meta.nullable;
    this.readonly = meta.readonly;
    this.select = meta.select;
    this.unique = meta.unique;
    this.comment = meta.comment;
    this.default = meta.default;
    this.precision = meta.precision;
    this.scale = meta.scale;
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
      generated: this.generated,
      createDate: this.createDate,
      updateDate: this.updateDate,
      deleteDate: this.deleteDate,
      version: this.version,
      length: this.length,
      width: this.width,
      nullable: this.nullable,
      readonly: this.readonly,
      select: this.select,
      unique: this.unique,
      comment: this.comment,
      default: this.default,
      precision: this.precision,
      scale: this.scale,
    }
  }
}