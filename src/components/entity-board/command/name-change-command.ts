import { PackageStore } from "../store/package";
import { SelectedNode } from "../store/entity-board";
import { Command } from "./command";
import { EntityStore } from "../store/entity-store";
import { ColumnStore } from "../store/column";
import { DiagramStore } from "../store/diagram";

export class NameChangeCommand implements Command{
  private oldName: string;
  constructor(
    private readonly store: PackageStore | EntityStore | ColumnStore | DiagramStore,
    private readonly newName: string,
  ){
    this.oldName = store.name;
  }
  
  excute():SelectedNode{
    this.store.setName(this.newName);
    return this.store;
  }
  undo():SelectedNode{
    this.store.setName(this.oldName);
    return this.store;
  };
}