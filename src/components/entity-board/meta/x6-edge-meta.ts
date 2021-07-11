import { Point } from "@antv/x6";

export type RolePosition = {
  distance: number,
  offset: number,
  angle: number,
}
export interface X6EdgeMeta{
  //对应relation id
  id: string;
  vertices?: Point.PointLike[];
  roleOnSourcePosition?: RolePosition;
  roleOnTargetPosition?: RolePosition;
}