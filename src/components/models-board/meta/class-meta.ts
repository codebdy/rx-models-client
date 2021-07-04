import { ColumnMeta } from "./column-meta";

export enum ClassType{
  enum = "Enum",
}

export interface ClassMeta{
  inheritFromId?: string;
  id: string;
  name: string;
  classType?: ClassType;
  columns: ColumnMeta[];
}
