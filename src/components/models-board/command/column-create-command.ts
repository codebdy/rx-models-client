import { ColumnStore } from "../store/column";
import { EntityStore } from "../store/entity-store";
import { SelectedNode } from "../store/models-board";
import { Command } from "./command";

export class ColumnCreateCommand implements Command{
  private columnStore?: ColumnStore;
  constructor(
    private readonly entityStore: EntityStore,
  ){}
  
  excute():SelectedNode{
    this.columnStore = this.entityStore.createdColumn();
    return this.columnStore;
  }

  undo():SelectedNode{
    if(!this.columnStore){
      return;
    }
    this.entityStore.deleteColumn(this.columnStore.id);
    return this.entityStore;
  };
}