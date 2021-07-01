export enum ColumnType{
  Number = "Number",
  Boolean = "Boolean",
  String = "String",
}
export interface ColumnMeta{
  id: string;
  name: string;
  type: ColumnType;
  primary?: boolean;
  generated?: boolean;
}