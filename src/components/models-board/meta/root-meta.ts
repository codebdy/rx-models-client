import { EntityMeta } from "./entity-meta";
import { DiagramMeta } from "./diagram-meta";
import { PackageMeta } from "./package-meta";
import { RelationMeta } from "./relation-meta";

export interface RootMeta{
  packageMetas: PackageMeta[];
  classMetas: EntityMeta[];
  diagramMetas: DiagramMeta[];
  relationMetas: RelationMeta[];
}