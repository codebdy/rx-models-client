import { DiagramStore } from "../store/diagram";
import { SelectedNode } from "../store/models-board";
import { Command } from "./command";

export class DiagramNameCommand implements Command{
  private oldName: string;
  constructor(
    private readonly diagramStore: DiagramStore,
    private readonly newName: string,
  ){
    this.oldName = diagramStore.name;
  }
  
  excute():SelectedNode{
    this.diagramStore.setName(this.newName);
    return this.diagramStore;
  }
  undo():SelectedNode{
    this.diagramStore.setName(this.oldName);
    return this.diagramStore;
  };
}