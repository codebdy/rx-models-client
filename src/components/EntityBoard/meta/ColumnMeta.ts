/**
 * 字段类型，枚举，目前版本仅支持这些类型，后续可以扩展
 */
export enum ColumnType {
  ID = "ID",
  /**
   * 数字类型
   */
  Int = "Int",

  Float = "Float",

  Boolean = "Boolean",

  String = "String",

  /**
   * 日期类型
   */
  Date = "Date",

  /**
   * JSON类型
   */
  SimpleJson = "SimpleJson",

  /**
   * 数组类型
   */
  SimpleArray = "SimpleArray",

  JsonArray = "JsonArray",

  /**
   * 枚举类型
   */
  Enum = "Enum",
}

/**
 * 字段元数据，基本跟 TypeORM Column 对应
 */
export interface ColumnMeta {
  /**
   * 唯一标识
   */
  uuid: string;

  /**
   * 字段名
   */
  name: string;

  /**
   * 字段类型
   */
  type: ColumnType;

  /**
   * 是否主键
   */
  primary?: boolean;

  /**
   * 是否自动生成
   */
  generated?: boolean;

  /**
   * 是否可空
   */
  nullable?: boolean;

  /**
   * 字段默认值
   */
  default?: any;

  /**
   * 是否唯一
   */
  unique?: boolean;

  index?: boolean;

  /**
   * 是否是创建日期
   */
  createDate?: boolean;

  /**
   * 是否是更新日期
   */
  updateDate?: boolean;

  /**
   * 是否是删除日期，软删除功能使用
   */
  deleteDate?: boolean;

  /**
   * 是否可以在查询时被选择，如果这是为false，则查询时隐藏。
   * 密码字段会使用它
   */
  select?: boolean;

  /**
   * 长度
   */
  length?: number;

  unsigned?: boolean;

  /**
   * 类型是实体或者接口时使用
   */
  typeEnityUuid?: string;

  readonly?: boolean;
  comment?: string;
}
