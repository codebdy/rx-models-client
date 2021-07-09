import { SelectedNode } from "../store/models-board";
import { PackageStore } from "../store/package";
import { RelationStore } from "../store/relation";
import { Command } from "./command";

export class RelationDeleteCommand implements Command{
  constructor(
    private readonly relationStore: RelationStore,
    private readonly rootStore: PackageStore,
  ){}
  
  excute(): SelectedNode{
    this.rootStore.deleteRelation(this.relationStore.uuid);
    return undefined;
  }
  undo(): SelectedNode{
    this.rootStore.addRelation(this.relationStore);
    return this.relationStore;
  };
}