import { makeAutoObservable, toJS } from "mobx";
import { ClassMeta } from "../meta/class-meta";
import { DiagramMeta } from "../meta/diagram-meta";
import { RelationMeta } from "../meta/relation-meta";
import { X6EdgeMeta } from "../meta/x6-edge-meta";
import { X6NodeMeta } from "../meta/x6-node-meta";
import { PackageStore } from "./package";

export type InheritMeta = {
  parentId: string,
  childId: string,
}
export type ClassNodeData = ClassMeta & {packageName?:string, isTempForNew?:boolean, isTempForDrag?: boolean};
export type NodeConfig = X6NodeMeta & {data: ClassNodeData};
export type EdgeConfig = X6EdgeMeta & {data: RelationMeta|InheritMeta};
export type GraphDataDiff = {
  createdNodes: NodeConfig[],
  removedNodes: NodeConfig[],
  updatedNodes:  NodeConfig[],

  createdEdges: EdgeConfig[],
  removedEdges: EdgeConfig[],
  updatedEdges:  EdgeConfig[],
}

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

  getNodeById(id:string){
    return this.nodes.find(node=>node.id === id);
  }

  addNode(node:X6NodeMeta){
    this.nodes.push(node);
  }

  setName(name:string){
    this.name = name;
  }

  /**
   * 点击保存按钮时时使用
   */
  updateGraphData(){

  }

  removeClass(){

  }

  updateClass(){

  }

  reomveInherit(){

  }

  addInherit(){

  }

  removeRelation(){

  }

  updateRelation(){

  }

  addRelation(){

  }

  toMeta(){
    return {
      id: this.id,
      nodes: toJS(this.nodes),
      edges: toJS(this.edges)
    };
  }
}