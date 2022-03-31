/**
 * 字段类型，枚举，目前版本仅支持这些类型，后续可以扩展
 */
export enum ValueType {
  ID = "ID",
  Int = "Int",
  Float = "Float",
  Boolean = "Boolean",
  String = "String",
  Date = "Date",
  Enum = "Enum",
  ValueObject = "ValueObject",
  Entity = "Entity",
  
  IDArray = "ID[]",
  IntArray = "Int[]",
  FloatArray = "Float[]",
  StringArray = "String[]",
  DateArray = "Date[]",
  EnumArray = "EnumArray",
  ValueObjectArray = "ValueObjectArray",
  EntityArray = "EntityArray",
}
