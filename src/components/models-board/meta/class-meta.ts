import { ColumnMeta } from "./column-meta";

export enum ClassType{
  enum = "Enum",
}

export interface ClassMeta{
  inheritFormId?: number;
  id: string;
  name: string;
  classType?: ClassType;
  columns: ColumnMeta[];
}
