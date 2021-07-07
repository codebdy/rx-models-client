import { ColumnStore } from "../store/column";
import { EntityStore } from "../store/entity-store";
import { SelectedNode } from "../store/models-board";
import { Command } from "./command";

export class ColumnDeleteCommand implements Command{
  private index: number = 0;
  private columnStore?: ColumnStore;
  constructor(
    private readonly entityStore: EntityStore,
    columnId: string,
  ){
    this.columnStore = this.entityStore.getColumnById(columnId);
    if(this.columnStore){
      this.index = entityStore.columns.indexOf(this.columnStore);      
    }

  }
  
  excute():SelectedNode{
    if(!this.columnStore){
      return;
    }
    this.entityStore.deleteColumn(this.columnStore.id)
    return this.entityStore;
  }

  undo():SelectedNode{
    if(!this.columnStore){
      return;
    }
    this.entityStore.insertColumn(this.columnStore, this.index);
    return this.entityStore;;
  };
}