import { DiagramMeta } from "../meta/DiagramMeta";
import { DiagramStore } from "../store/diagram";
import { EntityBoardStore, SelectedNode } from "../store/entity-board-store";
import { PackageStore } from "../store/package";
import { Command } from "./command";

export class DiagramCreateCommand implements Command{
  private diagramStore?: DiagramStore;
  constructor(
    private readonly meta: DiagramMeta,
    private readonly packageStore: PackageStore,
    private readonly bordStore: EntityBoardStore
  ){ }
  
  excute():SelectedNode{
    this.diagramStore = new DiagramStore(this.meta, this.bordStore, this.packageStore)
    this.packageStore.addDiagram(this.diagramStore);
    return undefined;
  }
  undo():SelectedNode{
    if(!this.diagramStore?.uuid){
      return
    }
    this.packageStore.deleteDiagram(this.diagramStore.uuid);
    if(this.bordStore.openedDiagram?.uuid === this.diagramStore.uuid){
      this.bordStore.setOpendDiagram(undefined);
    }
    return undefined;
  };
}