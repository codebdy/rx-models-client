import { SelectedNode } from "../store/models-board";
import { Command } from "./command";
import { ColumnStore } from "../store/column";

export class ColumnChangeCommand implements Command{
  private oldValue: any = {};
  constructor(
    private readonly column: ColumnStore,
    private readonly valueMeta: any,
  ){
    for(const field in this.valueMeta){
      this.oldValue[field] = (this.column as any)[field];
    }
  }
  
  excute():SelectedNode{
    for(const field in this.valueMeta){
      this.column.setFieldValue(field, this.valueMeta[field]);
    }
    return this.column;
  }
  undo():SelectedNode{
    for(const field in this.oldValue){
      this.column.setFieldValue(field, this.oldValue[field]);
    }
    return this.column;
  };
}