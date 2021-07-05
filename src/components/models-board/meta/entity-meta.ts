import { ColumnMeta } from "./column-meta";

export enum EntityType{
  enum = "Enum",
}

export interface EntityMeta{
  inheritFromId?: string;
  id: string;
  name: string;
  entityType?: EntityType;
  columns: ColumnMeta[];
}
