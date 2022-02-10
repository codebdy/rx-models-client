import { X6NodeMeta } from "../meta/X6NodeMeta";
import { EntityStore } from "../store/entity-store";
import { DiagramStore } from "../store/diagram";
import { SelectedNode } from "../store/entity-board-store";
import { Command } from "./command";

export class EntityAddCommand implements Command{
  constructor(
    private readonly diagramStore: DiagramStore,
    private readonly entityStore: EntityStore|undefined,
    private readonly nodeMeta: X6NodeMeta,
  ){}
  
  excute():SelectedNode{
    this.diagramStore?.addNode(this.nodeMeta);
    return this.entityStore;
  }
  undo():SelectedNode{
    this.diagramStore?.deleteNode(this.nodeMeta.id);
    return undefined;
  };
}