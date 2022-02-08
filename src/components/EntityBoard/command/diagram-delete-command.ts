import { DiagramStore } from "../store/diagram";
import { EntityBoardStore, SelectedNode } from "../store/entity-board-store";
import { PackageStore } from "../store/package";
import { Command } from "./command";

export class DiagramDeleteCommand implements Command{
  private packageStore?: PackageStore;
  private index: number;
  constructor(
    private readonly diagramStore: DiagramStore,
    private readonly bordStore: EntityBoardStore
  ){
    this.packageStore = diagramStore.belongsToPackage;
    this.index = this.packageStore?.diagrams.indexOf(diagramStore)||0;
  }
  
  excute():SelectedNode{
    this.packageStore?.deleteDiagram(this.diagramStore.uuid);
    if(this.bordStore.openedDiagram?.uuid === this.diagramStore.uuid){
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