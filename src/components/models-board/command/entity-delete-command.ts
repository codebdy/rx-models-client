import { EntityStore } from "../store/entity-store";
import { SelectedNode } from "../store/models-board";
import { PackageStore } from "../store/package";
import { Command } from "./command";

export class EntityDeleteCommand implements Command{
  private packageStore?: PackageStore;
  private index: number;
  constructor(
    private readonly entityStore: EntityStore,
  ){
    this.packageStore = entityStore.package;
    this.index = this.packageStore?.entities.indexOf(entityStore)||0;
  }
  
  excute():SelectedNode{
    this.packageStore?.deleteEntity(this.entityStore.uuid);
    return undefined;
  }

  undo():SelectedNode{
    if(!this.packageStore){
      return;
    }
    this.packageStore.insertEntity(this.entityStore, this.index);
    return this.entityStore;
  };
}