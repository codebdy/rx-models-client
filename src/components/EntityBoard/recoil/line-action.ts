import { Edge } from "@antv/x6";
import { RelationType } from "../meta/RelationMeta";

export interface LineAction {
  relationType: RelationType;
  sourceNodeId: string;
  tempEdge?:Edge;
}