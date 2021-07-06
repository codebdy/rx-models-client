import { makeAutoObservable } from "mobx";
import { RelationType, RelationMeta } from "../meta/relation-meta";
import { PackageStore } from "./package";

export class RelationStore{
  id: string;
  relationType: RelationType;
  sourceId: string;
  targetId: string;
  roleOnSource: string;
  roleOnTarget: string;

  constructor(meta:RelationMeta, private rootStore: PackageStore){
    this.id = meta.id;
    this.relationType = meta.relationType;
    this.sourceId = meta.sourceId;
    this.targetId = meta.targetId;
    this.roleOnSource = meta.roleOnSource;
    this.roleOnTarget = meta.roleOnTarget;
    makeAutoObservable(this)
  }

  setRoleOnSource(roleName:string){
    this.roleOnSource = roleName;
  }

  setRoleOnTarget(roleName:string){
    this.roleOnTarget = roleName;
  }


  toMeta(): RelationMeta{
    return {
      id: this.id,
      relationType: this.relationType,
      sourceId: this.sourceId,
      targetId: this.targetId,
      roleOnSource: this.roleOnSource,
      roleOnTarget: this.roleOnTarget,
    }
  }
}