import { X6NodeMeta } from "../meta/X6NodeMeta";
import { EntityStore } from "../store/entity-store";
import { DiagramStore } from "../store/diagram";
import { SelectedNode } from "../store/entity-board-store";
import { Command } from "./command";

export class NodeChangeCommand implements Command{
  private newNodeMeta: X6NodeMeta|undefined;
  private oldNodeMeta?: X6NodeMeta;
  constructor(
    private readonly diagramStore: DiagramStore,
    private readonly entityStore?: EntityStore,
  ){
    entityStore && (this.oldNodeMeta = diagramStore.getNodeById(entityStore?.uuid));
  }

  setNewNodeMeta(meta:X6NodeMeta){
    this.newNodeMeta = meta;
  }
  
  excute():SelectedNode{
    if(this.newNodeMeta){
      this.diagramStore.updateNode(this.newNodeMeta);      
    }

    return this.entityStore;
  }
  undo():SelectedNode{
    this.oldNodeMeta && this.diagramStore.updateNode(this.oldNodeMeta);
    return this.entityStore;
  };
}