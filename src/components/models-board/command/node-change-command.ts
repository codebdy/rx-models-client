import { X6NodeMeta } from "../meta/x6-node-meta";
import { ClassStore } from "../store/class-store";
import { DiagramStore } from "../store/diagram";
import { SelectedNode } from "../store/models-board";
import { Command } from "./command";

export class NodeChangeCommand implements Command{
  private newNodeMeta: X6NodeMeta|undefined;
  constructor(
    private readonly diagramStore: DiagramStore,
    private readonly oldNodeMeta: X6NodeMeta,
    private readonly classStore?: ClassStore,
  ){}

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
    this.diagramStore.updateNode(this.oldNodeMeta);
    return this.classStore;
  };
}