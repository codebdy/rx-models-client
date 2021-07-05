import { ColumnMeta } from "./column-meta";

export enum EntityType{
  enum = "Enum",
}

export interface EntityMeta{
  id: string;
  name: string;
  entityType?: EntityType;
  columns: ColumnMeta[];
}
