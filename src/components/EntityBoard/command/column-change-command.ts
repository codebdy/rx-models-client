import { SelectedNode } from "../store/entity-board-store";
import { Command } from "./command";
import { ColumnStore } from "../store/column";

export class ColumnChangeCommand implements Command{
  private oldValue: any = {};
  constructor(
    private readonly column: ColumnStore,
    private readonly valueMeta: any,
  ){
    this.oldValue = this.column.toMeta();
  }
  
  excute():SelectedNode{
    this.column.clearValues();
    for(const field in this.valueMeta){
      this.column.setFieldValue(field, this.valueMeta[field]);
    }
    return this.column;
  }
  undo():SelectedNode{
    this.column.clearValues()
    for(const field in this.oldValue){
      this.column.setFieldValue(field, this.oldValue[field]);
    }
    return this.column;
  };
}