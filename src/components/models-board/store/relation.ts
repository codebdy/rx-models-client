import { makeAutoObservable } from "mobx";
import { RelationType, RelationMeta } from "../meta/relation-meta";
import { PackageStore } from "./package";

export class RelationStore{
  uuid: string;
  relationType: RelationType;
  sourceId: string;
  targetId: string;
  roleOnSource: string;
  roleOnTarget: string;
  joinColumnAt?: string;
  joinTableAt?: string;

  constructor(meta:RelationMeta, private rootStore: PackageStore){
    this.uuid = meta.uuid;
    this.relationType = meta.relationType;
    this.sourceId = meta.sourceId;
    this.targetId = meta.targetId;
    this.roleOnSource = meta.roleOnSource;
    this.roleOnTarget = meta.roleOnTarget;
    this.joinColumnAt = meta.joinColumnAt;
    this.joinTableAt = meta.joinTableAt;
    if(this.relationType === RelationType.ONE_TO_ONE && !this.joinColumnAt){
      this.joinColumnAt = this.sourceId
    }

    if(this.relationType === RelationType.MANY_TO_MANY && !this.joinTableAt){
      this.joinTableAt = this.sourceId
    }
    makeAutoObservable(this);
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
      joinColumnAt: this.joinColumnAt,
      joinTableAt: this.joinTableAt 
    }
  }
}