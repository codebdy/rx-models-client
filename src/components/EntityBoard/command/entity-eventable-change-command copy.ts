import { SelectedNode } from "../store/entity-board-store";
import { Command } from "./command";
import { EntityStore } from "../store/entity-store";

export class EntityEventableChangeCommand implements Command{
  private oldValue: boolean|undefined;
  constructor(
    private readonly entityStore: EntityStore,
    private readonly newValue: boolean|undefined,
  ){
    this.oldValue = entityStore.eventable;
  }
  
  excute():SelectedNode{
    this.entityStore.setEventable(this.newValue);
    return this.entityStore;
  }
  undo():SelectedNode{
    this.entityStore.setEventable(this.oldValue);
    return this.entityStore;
  };
}