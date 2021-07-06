import { X6EdgeMeta } from "../meta/x6-edge-meta";
import { DiagramStore } from "../store/diagram";
import { SelectedNode } from "../store/models-board";
import { Command } from "./command";
import { RelationStore } from "../store/relation";

export class EdgeChangeCommand implements Command{
  private newEdgeMeta: X6EdgeMeta|undefined;
  private oldEdgeMeta?: X6EdgeMeta;
  constructor(
    private readonly diagramStore: DiagramStore,
    private readonly relationStore?: RelationStore,
  ){
    relationStore && (this.oldEdgeMeta = diagramStore.getEdgeById(relationStore?.id));
  }

  setNewEdgeMeta(meta:X6EdgeMeta){
    this.newEdgeMeta = meta;
  }
  
  excute():SelectedNode{
    if(this.newEdgeMeta){
      this.diagramStore.updageEdge(this.newEdgeMeta);      
    }

    return this.relationStore;
  }
  undo():SelectedNode{
    this.oldEdgeMeta && this.diagramStore.updageEdge(this.oldEdgeMeta);
    return this.relationStore;
  };
}