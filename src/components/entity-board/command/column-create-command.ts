import { ColumnStore } from "../store/column";
import { EntityStore } from "../store/entity-store";
import { SelectedNode } from "../store/entity-board";
import { Command } from "./command";

export class ColumnCreateCommand implements Command{
  private columnStore?: ColumnStore;
  constructor(
    private readonly entityStore: EntityStore,
    private readonly id:string,
  ){}
  
  excute():SelectedNode{
    this.columnStore = this.entityStore.createdColumn(this.id);
    return this.columnStore;
  }

  undo():SelectedNode{
    if(!this.columnStore){
      return;
    }
    this.entityStore.deleteColumn(this.columnStore.uuid);
    return this.entityStore;
  };
}