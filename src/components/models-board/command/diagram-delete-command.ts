import { DiagramStore } from "../store/diagram";
import { ModelsBoardStore, SelectedNode } from "../store/models-board";
import { PackageStore } from "../store/package";
import { Command } from "./command";

export class DiagramDeleteCommand implements Command{
  private packageStore?: PackageStore;
  private index: number;
  constructor(
    private readonly diagramStore: DiagramStore,
    private readonly bordStore: ModelsBoardStore
  ){
    this.packageStore = diagramStore.belongsToPackage;
    this.index = this.packageStore?.diagrams.indexOf(diagramStore)||0;
  }
  
  excute():SelectedNode{
    this.packageStore?.deleteDiagram(this.diagramStore.id);
    if(this.bordStore.openedDiagram?.id === this.diagramStore.id){
      this.bordStore.setOpendDiagram(undefined);
    }
    return undefined;
  }

  undo():SelectedNode{
    if(!this.packageStore){
      return;
    }
    this.packageStore.insertDiagram(this.diagramStore, this.index);
    return this.packageStore;
  };
}