import { X6EdgeMeta } from "../meta/X6EdgeMeta";
import { DiagramStore } from "../store/diagram";
import { SelectedNode } from "../store/entity-board-store";
import { PackageStore } from "../store/package";
import { RelationStore } from "../store/relation";
import { Command } from "./command";

export class RelationCreateCommand implements Command{
  private ownerPackage?:PackageStore;
  constructor(
    private readonly diagramStore: DiagramStore,
    private readonly relationStore: RelationStore,
    private readonly edgeMeta: X6EdgeMeta,
  ){
    this.ownerPackage = this.diagramStore?.rootStore.getEntityById(this.relationStore.ownerId)?.package;
  }
  
  excute():SelectedNode{
    if(!this.ownerPackage){
      return;
    }
    this.ownerPackage.addRelation(this.relationStore);
    this.diagramStore?.addEdge(this.edgeMeta);
    return this.relationStore;
  }
  undo():SelectedNode{
    if(!this.ownerPackage){
      return;
    }
    this.relationStore.setPakage(undefined);
    this.ownerPackage?.deleteRelation(this.relationStore.uuid)
    this.diagramStore?.deleteEdge(this.edgeMeta.id);
    return undefined;
  };
}