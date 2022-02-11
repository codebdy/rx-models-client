import { EntityMeta } from "./EntityMeta";
import { DiagramMeta } from "./DiagramMeta";
import { RelationMeta } from "./RelationMeta";

export enum PackageStatus{
  EDITING = 'EDITING',
  SYNCED = 'SYNCED'
}

/**
 * 包的元数据
 */
export interface PackageMeta{
  /**
   * ID，主键
   */
  id?: number;

  /**
   * 唯一标识
   */
  uuid: string;

  /**
   * 报名
   */
  name: string;

  /**
   * 实体列表
   */
  entities?: EntityMeta[];

  /**
   * ER图列表
   */
  diagrams?: DiagramMeta[];

  /**
   * 关系列表
   */
  relations?: RelationMeta[];
  status: PackageStatus;
}