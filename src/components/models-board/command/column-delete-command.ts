import { ColumnStore } from "../store/column";

import { SelectedNode } from "../store/models-board";
import { Command } from "./command";

export class ColumnDeleteCommand implements Command{
  private index: number = 0;

  constructor(
    private readonly columnStore: ColumnStore,
  ){
    this.index = columnStore.entityStore.columns.indexOf(this.columnStore);      
  }
  
  excute():SelectedNode{
    if(!this.columnStore){
      return;
    }
    this.columnStore.entityStore.deleteColumn(this.columnStore.uuid)
    return this.columnStore.entityStore;
  }

  undo():SelectedNode{
    if(!this.columnStore){
      return;
    }
    this.columnStore.entityStore.insertColumn(this.columnStore, this.index);
    return this.columnStore;;
  };
}