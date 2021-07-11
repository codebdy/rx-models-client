import { EntityBoardStore, SelectedNode } from "../store/entity-board-store";
import { PackageStore } from "../store/package";
import { Command } from "./command";

export class PackageDeleteCommand implements Command{
  private rootStore?: EntityBoardStore;
  private index: number;
  constructor(
    private readonly packageStore: PackageStore,
  ){
    this.rootStore = packageStore.rootStore;
    this.index = this.rootStore?.packages.indexOf(packageStore)||0;
  }
  
  excute():SelectedNode{
    this.rootStore?.deletePackage(this.packageStore.uuid);
    return undefined;
  }

  undo():SelectedNode{
    if(!this.rootStore){
      return;
    }
    this.rootStore.insertPackage(this.packageStore, this.index);
    return this.packageStore;
  };
}