import { makeAutoObservable, toJS } from "mobx";
import { EntityMeta } from "../meta/entity-meta";
import { DiagramMeta } from "../meta/diagram-meta";
import { RelationMeta } from "../meta/relation-meta";
import { X6EdgeMeta } from "../meta/x6-edge-meta";
import { EdgeType } from "../meta/edge-type";
import { X6NodeMeta } from "../meta/x6-node-meta";
import { PackageStore } from "./package";
import _ from "lodash";

export type InheritMeta = {
  parentId: string,
  childId: string,
}
export type ClassNodeData = EntityMeta & {packageName?:string, isTempForNew?:boolean, isTempForDrag?: boolean};
export type NodeConfig = X6NodeMeta & {data: ClassNodeData};
export type EdgeConfig = X6EdgeMeta & {data: RelationMeta|InheritMeta};

export interface GraphData{
  nodes: NodeConfig[];
  edges: EdgeConfig[];
}

export class DiagramStore{
  id: string;
  name: string;
  nodes: X6NodeMeta[] = [];
  edges: X6EdgeMeta[] = [];
  
  constructor(
    meta:DiagramMeta, 
    private rootStore: PackageStore, 
    public belongsToPackage: PackageStore
  ){
    this.id = meta.id;
    this.name = meta.name;
    this.nodes = meta.nodes;
    this.edges = meta.edges;
    makeAutoObservable(this)
  }

  getNodes(){
    return this.nodes.map(node=>{
      const classStore = this.rootStore.getClassById(node.id);
      const data = {...classStore?.toMeta(), packageName:classStore?.package?.name}
      return{...node, data};
    })
  }

  getAndMakeEdges(){
    const edges: X6EdgeMeta[] = [];
    //处理继承关系
    this.nodes.forEach(node=>{
      const classStore = this.rootStore.getClassById(node.id);
      if(classStore?.inheritFromId){
        const parentNode = this.nodes.find(aNode=>aNode.id === classStore?.inheritFromId);
        //如果父类在本图
        if(parentNode){
          const edgeId = classStore.id + '&' + parentNode.id;
          const edge =this.edges.find(edge=>edge.id === edgeId);
          if(edge){
            edges.push();
          }else{
            const edgeData = {id:edgeId, edgeType:EdgeType.inherit};
            this.edges.push(edgeData);
            edges.push(edgeData);
          }
        }
      }
    })

    return edges;
  }

  getNodeById(id:string){
    return this.nodes.find(node=>node.id === id);
  }

  addNode(node:X6NodeMeta){
    this.nodes.push(node);
  }

  deleteNode(id:string){
    _.remove(this.nodes, (node)=>node.id ===id);
  }

  updateNode(node:X6NodeMeta){
    for(let i = 0; i< this.nodes.length; i++){
      if(this.nodes[i].id === node.id){
        this.nodes[i] = node;
      }
    }
  }

  setName(name:string){
    this.name = name;
  }

  toMeta(){
    return {
      id: this.id,
      nodes: toJS(this.nodes),
      edges: toJS(this.edges)
    };
  }
}