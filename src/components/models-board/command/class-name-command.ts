import { ClassStore } from "../store/class-store";
import { SelectedNode } from "../store/models-board";
import { Command } from "./command";

export class ClassNameCommand implements Command{
  private oldName: string;
  constructor(
    private readonly classStore: ClassStore,
    private readonly newName: string,
  ){
    this.oldName = classStore.name;
  }
  
  excute():SelectedNode{
    this.classStore.setName(this.newName);
    return this.classStore;
  }
  undo():SelectedNode{
    this.classStore.setName(this.oldName);
    return this.classStore;
  };
}