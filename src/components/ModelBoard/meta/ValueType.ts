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
  ClassType = "ClassType",
  
  IDArray = "IDArray",
  IntArray = "IntArray",
  FloatArray = "FloatArray",
  StringArray = "StringArray",
  DateArray = "DateArray",
  EnumArray = "EnumArray",
  ValueObjectArray = "ValueObjectArray",
  ClassTypeArray = "ClassTypeArray",
}
