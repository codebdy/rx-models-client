import { makeAutoObservable, toJS } from "mobx";
import { ClassMeta } from "../meta/class-meta";
import { DiagramMeta } from "../meta/diagram-meta";
import { RelationMeta } from "../meta/relation-meta";
import { X6EdgeMeta } from "../meta/x6-edge-meta";
import { X6NodeMeta } from "../meta/x6-node-meta";
import _ from "lodash";
import { PackageStore } from "./package";

export type InheritMeta = {
  parentId: string,
  childId: string,
}
export type ClassNodeData = ClassMeta & {packageName?:string};
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
  
  constructor(meta:DiagramMeta, private rootStore: PackageStore){
    this.id = meta.id;
    this.name = meta.name;
    this.nodes = meta.nodes;
    this.edges = meta.edges;
    makeAutoObservable(this)
  }

  //画布内容Diff，只关注基础meta，忽略位置信息
  getGraphDataDiff(oldGraphData: GraphData): GraphDataDiff{
    const createdNodes: NodeConfig[] = [];
    const removedNodes: NodeConfig[] = [];
    const updatedNodes: NodeConfig[] = [];
    const createdEdges: EdgeConfig[] = [];
    const removedEdges: EdgeConfig[] = [];
    const updatedEdges: EdgeConfig[] = [];

    this.nodes.forEach(node=>{
      const classStore = this.rootStore.getClassById(node.id);
      if(classStore){
        const data = {...classStore.toMeta(), packageName:classStore.package?.name}
        const oldNode = oldGraphData.nodes.find(oldNode=>oldNode.id === node.id);
        if(!oldNode){
          createdNodes.push({...node, data});
        }
        else if(!_.isEqual(data, oldNode.data)){
          updatedNodes.push({...node, data});
        }        
      }
    })

    oldGraphData.nodes.forEach(oldNode => {
      if(!this.nodes.find(node=>node.id === oldNode.id)){
        removedNodes.push(oldNode);
      }
    });

    return {
      createdNodes,
      removedNodes,
      updatedNodes,    
      createdEdges,
      removedEdges,
      updatedEdges,
    }
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