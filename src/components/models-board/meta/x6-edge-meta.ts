import { Point } from "@antv/x6";

export enum EdgeType{
  inherit = "inherit",
  association = "association",
  aggregation = "aggregation",
  combination = "combination",
}

export interface X6EdgeMeta{
  //对应relation id
  id: string;
  edgeType: EdgeType;
  vertices: Point.PointLike[];
}