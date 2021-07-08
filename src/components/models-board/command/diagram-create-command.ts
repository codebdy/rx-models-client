import { DiagramMeta } from "../meta/diagram-meta";
import { DiagramStore } from "../store/diagram";
import { ModelsBoardStore, SelectedNode } from "../store/models-board";
import { PackageStore } from "../store/package";
import { Command } from "./command";

export class DiagramCreateCommand implements Command{
  private diagramStore?: DiagramStore;
  constructor(
    private readonly meta: DiagramMeta,
    private readonly packageStore: PackageStore,
    private readonly bordStore: ModelsBoardStore
  ){ }
  
  excute():SelectedNode{
    this.diagramStore = new DiagramStore(this.meta, this.bordStore.rootStore, this.packageStore)
    this.packageStore.addDiagram(this.diagramStore);
    return undefined;
  }
  undo():SelectedNode{
    if(!this.diagramStore?.id){
      return
    }
    this.packageStore.deleteDiagram(this.diagramStore.id);
    if(this.bordStore.openedDiagram?.id === this.diagramStore.id){
      this.bordStore.setOpendDiagram(undefined);
    }
    return undefined;
  };
}