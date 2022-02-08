import { EntityStore } from "../store/entity-store";
import { SelectedNode } from "../store/entity-board-store";
import { PackageStore } from "../store/package";
import { Command } from "./command";
import { RelationStore } from "../store/relation";
import { DiagramStore } from "../store/diagram";
import { X6NodeMeta } from "../meta/x6-node-meta";

export class EntityDeleteCommand implements Command{
  private packageStore?: PackageStore;
  private index: number;
  private targetRelations: RelationStore[] = [];
  private souceRelations: RelationStore[] = [];
  private nodesInDiagrams: any = {};

  constructor(
    private readonly entityStore: EntityStore,
  ){
    this.packageStore = entityStore.package;
    this.index = this.packageStore?.entities.indexOf(entityStore)||0;
    //相关的关系
    this.targetRelations = entityStore.getTargetRelations();
    this.souceRelations = entityStore.getSourceRelations();
    //图中的节点
    for(const diagram of entityStore.getRootStore().getDiagrams()){
      const node = diagram.getNodeById(entityStore.uuid);
      if(node){
        this.nodesInDiagrams[diagram.uuid] = {
          node:node,
          diagram:diagram,
        }
      }
    }

  }
  
  excute():SelectedNode{
    this.packageStore?.deleteEntity(this.entityStore.uuid);
    for(const relaton of this.targetRelations){
      relaton.packageStore?.deleteRelation(relaton.uuid);
    }
    for(const relaton of this.souceRelations){
      relaton.packageStore?.deleteRelation(relaton.uuid);
    }
    for(const key in this.nodesInDiagrams){
      const diagram:DiagramStore = this.nodesInDiagrams[key].diagram;
      const node:X6NodeMeta = this.nodesInDiagrams[key].node;
      diagram.deleteNode(node.id);
    }
    return undefined;
  }

  undo():SelectedNode{
    if(!this.packageStore){
      return;
    }
    this.packageStore.insertEntity(this.entityStore, this.index);

    for(const relaton of this.targetRelations){
      relaton.packageStore?.addRelation(relaton);
    }
    for(const relaton of this.souceRelations){
      relaton.packageStore?.addRelation(relaton);
    }

    for(const key in this.nodesInDiagrams){
      const diagram:DiagramStore = this.nodesInDiagrams[key].diagram;
      const node:X6NodeMeta = this.nodesInDiagrams[key].node;
      diagram.addNode(node);
    }
    return this.entityStore;
  };
}