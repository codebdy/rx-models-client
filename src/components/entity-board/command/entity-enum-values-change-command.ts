import { SelectedNode } from "../store/entity-board-store";
import { Command } from "./command";
import { EntityStore } from "../store/entity-store";

export class EntityEnumValuesChangeCommand implements Command{
  private oldValue: any;
  constructor(
    private readonly entityStore: EntityStore,
    private readonly newValue: any,
  ){
    this.oldValue = entityStore.enumValues;
  }
  
  excute():SelectedNode{
    this.entityStore.setEnumValues(this.newValue);
    return this.entityStore;
  }
  undo():SelectedNode{
    this.entityStore.setEnumValues(this.oldValue);
    return this.entityStore;
  };
}