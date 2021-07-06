import { RelationMeta } from "../meta/relation-meta";
import { X6EdgeMeta } from "../meta/x6-edge-meta";
import { DiagramStore } from "../store/diagram";
import { SelectedNode } from "../store/models-board";
import { Command } from "./command";

export class CreateRelationCommand implements Command{
  constructor(
    private readonly diagramStore: DiagramStore,
    private readonly relationMeta: RelationMeta,
    private readonly edgeMeta: X6EdgeMeta,
  ){}
  
  excute():SelectedNode{
    const relationStore = this.diagramStore?.rootStore.addNewRelation(this.relationMeta);
    this.diagramStore?.addEdge(this.edgeMeta);
    return relationStore;
  }
  undo():SelectedNode{
    this.diagramStore?.rootStore?.deleteRelation(this.relationMeta.id)
    this.diagramStore?.deleteEdge(this.edgeMeta.id);
    return undefined;
  };
}