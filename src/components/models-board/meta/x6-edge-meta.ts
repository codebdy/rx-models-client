import { Point } from "@antv/x6";

export interface X6EdgeMeta{
  //对应relation id
  id: string;
  vertices?: Point.PointLike[];
}