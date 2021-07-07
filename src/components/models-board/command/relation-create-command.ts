import { X6EdgeMeta } from "../meta/x6-edge-meta";
import { DiagramStore } from "../store/diagram";
import { SelectedNode } from "../store/models-board";
import { RelationStore } from "../store/relation";
import { Command } from "./command";

export class RelationCreateCommand implements Command{
  constructor(
    private readonly diagramStore: DiagramStore,
    private readonly relationStore: RelationStore,
    private readonly edgeMeta: X6EdgeMeta,
  ){}
  
  excute():SelectedNode{
    const relationStore = this.diagramStore?.belongsToPackage?.rootStore?.addNewRelation(this.relationStore);
    this.diagramStore?.addEdge(this.edgeMeta);
    return relationStore;
  }
  undo():SelectedNode{
    this.diagramStore?.belongsToPackage?.rootStore?.deleteRelation(this.relationStore.id)
    this.diagramStore?.deleteEdge(this.edgeMeta.id);
    return undefined;
  };
}