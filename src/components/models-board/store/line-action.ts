import { Edge, Node } from "@antv/x6";
import { EdgeType } from "../meta/edge-type";

export interface LineAction {
  edgeType: EdgeType;
  sourceNode: Node;
  initPoint:{ x:number, y:number };
  tempEdge?:Edge;
}