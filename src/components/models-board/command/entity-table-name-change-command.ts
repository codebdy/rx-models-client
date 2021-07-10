import { SelectedNode } from "../store/models-board";
import { Command } from "./command";
import { EntityStore } from "../store/entity-store";

export class EntityTableNameChangeCommand implements Command{
  private oldTableName: string|undefined;
  constructor(
    private readonly entityStore: EntityStore,
    private readonly newName: string,
  ){
    this.oldTableName = entityStore.tableName;
  }
  
  excute():SelectedNode{
    this.entityStore.setTableName(this.newName);
    return this.entityStore;
  }
  undo():SelectedNode{
    this.entityStore.setTableName(this.oldTableName);
    return this.entityStore;
  };
}