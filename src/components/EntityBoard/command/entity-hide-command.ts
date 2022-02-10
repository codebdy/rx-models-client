import { X6NodeMeta } from "../meta/X6NodeMeta";
import { DiagramStore } from "../store/diagram";
import { EntityStore } from "../store/entity-store";
import { SelectedNode } from "../store/entity-board-store";
import { Command } from "./command";

export class EntityHideCommand implements Command{
  private newNodeMeta: X6NodeMeta|undefined;
  constructor(
    private readonly diagramStore: DiagramStore,
    private readonly nodeMeta: X6NodeMeta,
    private readonly entityStore?: EntityStore,
  ){}

  excute():SelectedNode{
    this.diagramStore.deleteNode(this.nodeMeta.id);      
    return undefined;
  }
  undo():SelectedNode{
    this.diagramStore.addNode(this.nodeMeta);
    return this.entityStore;
  };
}