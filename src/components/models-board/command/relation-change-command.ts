import { SelectedNode } from "../store/models-board";
import { Command } from "./command";
import { RelationType } from "../meta/relation-meta";
import { RelationStore } from "../store/relation";

export class RelationChangeCommand implements Command{
  private oldValue: RelationType;
  constructor(
    private readonly relation: RelationStore,
    private readonly field: string,
    private readonly newValue: any,
  ){
    this.oldValue = (relation as any)[field];
  }
  
  excute():SelectedNode{
    this.relation.setFieldValue(this.field, this.newValue);
    return this.relation;
  }
  undo():SelectedNode{
    this.relation.setFieldValue(this.field, this.oldValue);
    return this.relation;
  };
}