import { EntityMeta } from "./entity-meta";
import { DiagramMeta } from "./diagram-meta";
import { RelationMeta } from "./relation-meta";

export enum PackageStatus{
  EDITING = 'EDITING',
  SYNCED = 'SYNCED'
}

export interface PackageMeta{
  id?: number;
  uuid: string;
  name: string;
  entities?: EntityMeta[];
  diagrams?: DiagramMeta[];
  relations?: RelationMeta[];
  status: PackageStatus;
}