import { makeAutoObservable } from "mobx";
import { RelationType, RelationMeta } from "../meta/relation-meta";
import { PackageStore } from "./package";

export class RelationStore{
  public packageStore?: PackageStore
  uuid: string;
  relationType: RelationType;
  sourceId: string;
  targetId: string;
  roleOnSource?: string;
  roleOnTarget?: string;
  ownerId?: string;

  constructor(meta:RelationMeta, packageStore?:PackageStore){
    this.uuid = meta.uuid;
    this.relationType = meta.relationType;
    this.sourceId = meta.sourceId;
    this.targetId = meta.targetId;
    this.roleOnSource = meta.roleOnSource;
    this.roleOnTarget = meta.roleOnTarget;
    this.ownerId = meta.ownerId;
    if(this.relationType === RelationType.ONE_TO_ONE && !this.ownerId){
      this.ownerId = this.sourceId
    }

    if(this.relationType === RelationType.MANY_TO_MANY && !this.ownerId){
      this.ownerId = this.sourceId
    }
    this.packageStore = packageStore;
    makeAutoObservable(this);
  }

  setPakage(packageStore:PackageStore|undefined){
    this.packageStore = packageStore;
  }

  setRoleOnSource(roleName:string){
    this.roleOnSource = roleName;
  }

  setRoleOnTarget(roleName:string){
    this.roleOnTarget = roleName;
  }

  setFieldValue(field:string, value:any){
    (this as any)[field] = value;
  }

  toMeta(): RelationMeta{
    return {
      uuid: this.uuid,
      relationType: this.relationType,
      sourceId: this.sourceId,
      targetId: this.targetId,
      roleOnSource: this.roleOnSource,
      roleOnTarget: this.roleOnTarget,
      ownerId: this.ownerId,
    }
  }
}