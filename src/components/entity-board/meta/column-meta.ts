export enum ColumnType{
  Number = 'Number',
  Boolean = 'Boolean',
  String = 'String',
  Date = 'Date',
  SimpleJson = 'simple-json',
  SimpleArray = 'simple-array',
  Enum = 'Enum'
}
export interface ColumnMeta{
  uuid: string;
  name: string;
  type: ColumnType;
  primary?: boolean;
  generated?: boolean;
  nullable?: boolean;
  default?: any;
  unique?: boolean;
  createDate?: boolean;
  updateDate?: boolean;
  deleteDate?: boolean;
  select?: boolean;
  length?: string | number;
  width?: number;
  version?: boolean;
  readonly?: boolean;
  enumEnityUuid?:string;
  
  /**
   * Column comment.
   */
  comment?: string;
 
  /**
   * The precision for a decimal (exact numeric) column (applies only for decimal column), which is the maximum
   * number of digits that are stored for the values.
   */
  precision?: number;
  /**
   * The scale for a decimal (exact numeric) column (applies only for decimal column), which represents the number
   * of digits to the right of the decimal point and must not be greater than precision.
   */
  scale?: number;
}