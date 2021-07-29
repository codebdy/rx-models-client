import { X6EdgeMeta } from "./x6-edge-meta";
import { X6NodeMeta } from "./x6-node-meta";

/**
 * ER图元数据
 */
export interface DiagramMeta {
  /**
   * 唯一标识
   */
  uuid: string;

  /**
   * ER图名称
   */
  name: string;

  /**
   * 节点
   */
  nodes: X6NodeMeta[];

  /**
   * 关系的连线
   */
  edges: X6EdgeMeta[];
}
