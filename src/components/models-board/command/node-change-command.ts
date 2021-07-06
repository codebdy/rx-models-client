import { X6NodeMeta } from "../meta/x6-node-meta";
import { EntityStore } from "../store/entity-store";
import { DiagramStore } from "../store/diagram";
import { SelectedNode } from "../store/models-board";
import { Command } from "./command";

export class NodeChangeCommand implements Command{
  private newNodeMeta: X6NodeMeta|undefined;
  private oldNodeMeta?: X6NodeMeta;
  constructor(
    private readonly diagramStore: DiagramStore,
    private readonly classStore?: EntityStore,
  ){
    classStore && (this.oldNodeMeta = diagramStore.getNodeById(classStore?.id));
  }

  setNewNodeMeta(meta:X6NodeMeta){
    this.newNodeMeta = meta;
  }
  
  excute():SelectedNode{
    if(this.newNodeMeta){
      this.diagramStore.updateNode(this.newNodeMeta);      
    }

    return this.classStore;
  }
  undo():SelectedNode{
    this.oldNodeMeta && this.diagramStore.updateNode(this.oldNodeMeta);
    return this.classStore;
  };
}