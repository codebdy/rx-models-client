import { SelectedNode } from "../store/models-board";
import { PackageStore } from "../store/package";
import { Command } from "./command";

export class PackageCreateCommand implements Command{
  constructor(
    private readonly packageStore: PackageStore,
    private readonly parentPackage: PackageStore,
  ){}
  
  excute():SelectedNode{
   this.parentPackage.addPackge(this.packageStore);
    return this.packageStore;
  }
  undo():SelectedNode{
    if(!this.packageStore){
      return;
    }
    this.parentPackage.deletePackage(this.packageStore.id);
    return undefined;
  };
}