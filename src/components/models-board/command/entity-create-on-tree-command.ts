import { EntityMeta } from "../meta/entity-meta";
import { SelectedNode } from "../store/models-board";
import { PackageStore } from "../store/package";
import { Command } from "./command";

export class EntityCreateOnTreeCommand implements Command{
  constructor(
    private readonly packageStore: PackageStore,
    private readonly entityMeta: EntityMeta,
  ){}
  
  excute():SelectedNode{
    const entityStore = this.packageStore.createNewEntity(this.entityMeta);
    return entityStore;
  }
  undo():SelectedNode{
    this.packageStore.deleteEntity(this.entityMeta.uuid);
    return undefined;
  };
}