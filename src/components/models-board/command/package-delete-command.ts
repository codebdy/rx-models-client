import { SelectedNode } from "../store/models-board";
import { PackageStore } from "../store/package";
import { Command } from "./command";

export class PackageDeleteCommand implements Command{
  private parentPackage?: PackageStore;
  private index: number;
  constructor(
    private readonly packageStore: PackageStore,
  ){
    this.parentPackage = packageStore.parent;
    this.index = this.parentPackage?.packages.indexOf(packageStore)||0;
  }
  
  excute():SelectedNode{
    this.parentPackage?.deletePackage(this.packageStore.uuid);
    return undefined;
  }

  undo():SelectedNode{
    if(!this.parentPackage){
      return;
    }
    this.parentPackage.insertPackage(this.packageStore, this.index);
    return this.packageStore;
  };
}