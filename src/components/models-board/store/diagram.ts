import { makeAutoObservable, toJS } from "mobx";
import { EntityMeta } from "../meta/entity-meta";
import { DiagramMeta } from "../meta/diagram-meta";
import { X6EdgeMeta } from "../meta/x6-edge-meta";
import { X6NodeMeta } from "../meta/x6-node-meta";
import { PackageStore } from "./package";
import _ from "lodash";
import { RelationMeta } from "../meta/relation-meta";
import { ModelsBoardStore } from "./models-board";

export type EntityNodeData = EntityMeta & {
    packageName?:string, 
    isTempForNew?:boolean, 
    isTempForDrag?: boolean,
    selectedId?:string,
    isPressedRelation?:boolean,
  };
export type NodeConfig = X6NodeMeta & {data: EntityNodeData};
export type EdgeConfig = X6EdgeMeta & RelationMeta;

export class DiagramStore{
  uuid: string;
  name: string;
  nodes: X6NodeMeta[] = [];
  edges: X6EdgeMeta[] = [];
  
  constructor(
    meta:DiagramMeta, 
    public readonly rootStore: ModelsBoardStore, 
    public readonly belongsToPackage: PackageStore
  ){
    this.uuid = meta.uuid;
    this.name = meta.name;
    this.nodes = meta.nodes;
    this.edges = meta.edges;
    makeAutoObservable(this)
  }

  getNodes(selectedId:string|undefined, isPressedRelation:boolean|undefined){
    return this.nodes.map(node=>{
      const entityStore = this.rootStore.getEntityById(node.id);
      const data = {
        ...entityStore?.toMeta(), 
        packageName:(this.belongsToPackage.uuid !== entityStore?.package?.uuid)
         ? (entityStore?.package?.name)
         : '',
         selectedId: selectedId,
         isPressedRelation: isPressedRelation,
      }

      return{...node, data};
    })
  }

  getAndMakeEdges(){
    const edges: EdgeConfig[] = [];

    this.rootStore.getRelations()?.forEach(relation=>{
      const source = this.nodes.find(node=>node.id === relation.sourceId);
      const target = this.nodes.find(node=>node.id === relation.targetId);
      if(source && target){
        const edge = this.edges.find(edge=>edge.id === relation.uuid);
        const relationMeta = relation.toMeta();
        if(edge){
          edges.push({
            ...edge, 
            ...relationMeta
          });
        }else{
          const newEdge = {id:relation.uuid};
          edges.push({
            ...newEdge, 
            ...relationMeta
          })
        }
      }
    })
    return edges;
  }

  getNodeById(id:string){
    return this.nodes.find(node=>node.id === id);
  }

  getEdgeById(id:string){
    return this.edges.find(edge=>edge.id === id);
  }

  addNode(node:X6NodeMeta){
    this.nodes.push(node);
  }

  deleteNode(id:string){
    _.remove(this.nodes, (node)=>node.id ===id);
  }

  deleteEdge(id:string){
    _.remove(this.edges, (edge)=>edge.id ===id);
  }

  updateNode(node:X6NodeMeta){
    for(let i = 0; i< this.nodes.length; i++){
      if(this.nodes[i].id === node.id){
        this.nodes[i] = node;
      }
    }
  }

  updageEdge(edge:X6EdgeMeta){
    for(let i = 0; i< this.edges.length; i++){
      if(this.edges[i].id === edge.id){
        this.edges[i] = edge;
      }
    }
  }

  setName(name:string){
    this.name = name;
  }

  addEdge(edge:X6EdgeMeta){
    this.edges.push(edge);
  }

  toMeta(){
    return {
      uuid: this.uuid,
      name: this.name,
      nodes: toJS(this.nodes),
      edges: toJS(this.edges)
    };
  }
}