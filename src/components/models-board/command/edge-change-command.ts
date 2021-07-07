import { X6EdgeMeta } from "../meta/x6-edge-meta";
import { DiagramStore } from "../store/diagram";
import { SelectedNode } from "../store/models-board";
import { Command } from "./command";
import { RelationStore } from "../store/relation";

export class EdgeChangeCommand implements Command{
  private oldEdgeMeta?: X6EdgeMeta;
  constructor(
    private readonly diagramStore: DiagramStore,
    private readonly newEdgeMeta: X6EdgeMeta,
    private readonly relationStore?: RelationStore,
  ){
    relationStore && (this.oldEdgeMeta = diagramStore.getEdgeById(relationStore?.id));
  }

  excute():SelectedNode{
    if(this.newEdgeMeta){
      if(this.oldEdgeMeta){
        this.diagramStore.updageEdge(this.newEdgeMeta);           
      }else{
        this.diagramStore.addEdge(this.newEdgeMeta);
      }
    }
    return this.relationStore;
  }
  undo():SelectedNode{
    if(this.oldEdgeMeta){
      this.diagramStore.updageEdge(this.oldEdgeMeta);
    }else{
      this.diagramStore.deleteEdge(this.newEdgeMeta.id);
    }
    return this.relationStore;
  };
}