import { Edge, Node } from "@antv/x6";

export enum LinkType{
  inherit = 1,
  association_1_to_1,
  association_many_to_1,
  association_many_to_many,
  aggregation_1_to_1,
  aggregation_many_to_1,
  combination_1_to_1,
  conbination_many_to_1,
}

export interface LinkAction {
  linkType: LinkType;
  sourceNode: Node;
  initPoint:{ x:number, y:number };
  tempEdge?:Edge;
}