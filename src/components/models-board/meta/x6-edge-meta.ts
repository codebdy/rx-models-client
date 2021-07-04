import { Point } from "@antv/x6";
import { EdgeType } from "./edge-type";

export interface X6EdgeMeta{
  //对应relation id
  id: string;
  edgeType: EdgeType;
  vertices?: Point.PointLike[];
}