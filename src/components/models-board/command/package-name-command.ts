import { PackageStore } from "../store/package";
import { SelectedNode } from "../store/models-board";
import { Command } from "./command";

export class PackageNameCommand implements Command{
  private oldName: string;
  constructor(
    private readonly packageStore: PackageStore,
    private readonly newName: string,
  ){
    this.oldName = packageStore.name;
  }
  
  excute():SelectedNode{
    this.packageStore.setName(this.newName);
    return this.packageStore;
  }
  undo():SelectedNode{
    this.packageStore.setName(this.oldName);
    return this.packageStore;
  };
}