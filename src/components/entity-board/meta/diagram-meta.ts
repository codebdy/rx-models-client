import { X6EdgeMeta } from "./x6-edge-meta";
import { X6NodeMeta } from "./x6-node-meta";

export interface DiagramMeta {
  uuid: string;
  name: string;
  nodes: X6NodeMeta[];
  edges: X6EdgeMeta[];
}
