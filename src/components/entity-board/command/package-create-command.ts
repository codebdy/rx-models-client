import { EntityBoardStore, SelectedNode } from "../store/entity-board";
import { PackageStore } from "../store/package";
import { Command } from "./command";

export class PackageCreateCommand implements Command{
  constructor(
    private readonly packageStore: PackageStore,
    private readonly rootStore: EntityBoardStore,
  ){}
  
  excute():SelectedNode{
   this.rootStore.addPackge(this.packageStore);
    return this.packageStore;
  }
  undo():SelectedNode{
    if(!this.packageStore){
      return;
    }
    this.rootStore.deletePackage(this.packageStore.uuid);
    return undefined;
  };
}