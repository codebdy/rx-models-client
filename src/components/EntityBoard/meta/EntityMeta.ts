import { ColumnMeta } from "./ColumnMeta";

/**
 * 实体类型枚举，目前仅支持普通实体跟枚举实体，
 * 枚举实体类似语法糖，不映射数据库，
 * 枚举类型的字段映射到数据库是sttring类型
 */
export enum EntityType {
  NORMAL = "Normal",
  ENUM = "Enum",
  INTERFACE = "Interface",
}

/**
 * 实体元数据
 */
export interface EntityMeta {
  /**
   * 唯一标识
   */
  uuid: string;

  /**
   * 实体名称
   */
  name: string;

  /**
   * 表名，如果tableName没有被设置，会把实体名转化成蛇形命名法当作表名
   */
  tableName?: string;

  /**
   * 实体类型
   */
  entityType?: EntityType | "";

  /**
   * 字段有元数据列表
   */
  columns: ColumnMeta[];

  /**
   * 枚举值JSON，枚举类型实体使用，不参与数据库映射
   */
  enumValues?: any;

  eventable?: boolean;
}
