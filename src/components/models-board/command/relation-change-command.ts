import { SelectedNode } from "../store/models-board";
import { Command } from "./command";
import { RelationStore } from "../store/relation";

export class RelationChangeCommand implements Command{
  private oldValue: any = {};
  constructor(
    private readonly relation: RelationStore,
    private readonly valueMeta: any,
  ){
    for(const field in this.valueMeta){
      this.oldValue[field] = (this.relation as any)[field];
    }
  }
  
  excute():SelectedNode{
    for(const field in this.valueMeta){
      this.relation.setFieldValue(field, this.valueMeta[field]);
    }
    return this.relation;
  }
  undo():SelectedNode{
    for(const field in this.oldValue){
      this.relation.setFieldValue(field, this.oldValue[field]);
    }
    return this.relation;
  };
}