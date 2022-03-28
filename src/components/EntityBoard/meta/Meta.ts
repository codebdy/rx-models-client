import { IObject } from "do-ents/IObject";
import { DiagramMeta } from "./DiagramMeta";
import { ClassMeta } from "./ClassMeta";
import { RelationMeta } from "./RelationMeta";
import { X6EdgeMeta } from "./X6EdgeMeta";
import { X6NodeMeta } from "./X6NodeMeta";

export const EntityNameMeta = "Meta";

export enum MetaStatus {
  META_STATUS_PUBLISHED = "published",
  META_STATUS_CANCELLED = "cancelled",
  META_STATUS_MIGRATION_ERROR = "migrationError",
  META_STATUS_ROLLBACK_ERROR = "rollbackError",
}

export interface Meta extends IObject {
  id?: number;
  content: {
    classes: ClassMeta[];
    diagrams: DiagramMeta[];
    relations: RelationMeta[];
    x6Nodes: X6NodeMeta[];
    x6Edges: X6EdgeMeta[];
  };
  status?: MetaStatus;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export const CONST_ID = "id"