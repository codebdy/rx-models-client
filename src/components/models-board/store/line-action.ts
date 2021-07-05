import { Edge } from "@antv/x6";
import { RelationType } from "../meta/relation-meta";

export interface LineAction {
  relationType: RelationType;
  sourceNodeId: string;
  tempEdge?:Edge;
}