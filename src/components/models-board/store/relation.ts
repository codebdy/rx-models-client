import { makeAutoObservable } from "mobx";
import { ConstraintType, RelationMeta, RelationType } from "../meta/relation-meta";
import { PackageStore } from "./package";

export class RelationStore{
  id: string;
  relationType: RelationType;
  constraintType: ConstraintType;
  sourceId: string;
  targetId: string;
  nameOnSource: string;
  nameOnTarget: string;

  constructor(meta:RelationMeta, private rootStore: PackageStore){
    this.id = meta.id;
    this.relationType = meta.relationType;
    this.constraintType = meta.constraintType;
    this.sourceId = meta.sourceId;
    this.targetId = meta.targetId;
    this.nameOnSource = meta.nameOnSource;
    this.nameOnTarget = meta.nameOnTarget;
    makeAutoObservable(this)
  }

  toMeta(): RelationMeta{
    return {
      id: this.id,
      relationType: this.relationType,
      constraintType: this.constraintType,
      sourceId: this.sourceId,
      targetId: this.targetId,
      nameOnSource: this.nameOnSource,
      nameOnTarget: this.nameOnTarget,
    }
  }
}