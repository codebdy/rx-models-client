import { makeAutoObservable } from "mobx";
import { RelationType, RelationMeta } from "../meta/relation-meta";
import { PackageStore } from "./package";

export class RelationStore{
  id: string;
  relationType: RelationType;
  sourceId: string;
  targetId: string;
  nameOnSource: string;
  nameOnTarget: string;

  constructor(meta:RelationMeta, private rootStore: PackageStore){
    this.id = meta.id;
    this.relationType = meta.relationType;
    this.sourceId = meta.sourceId;
    this.targetId = meta.targetId;
    this.nameOnSource = meta.roleOnSource;
    this.nameOnTarget = meta.roleOnTarget;
    makeAutoObservable(this)
  }

  toMeta(): RelationMeta{
    return {
      id: this.id,
      relationType: this.relationType,
      sourceId: this.sourceId,
      targetId: this.targetId,
      roleOnSource: this.nameOnSource,
      roleOnTarget: this.nameOnTarget,
    }
  }
}