import { ClassMeta } from "./class-meta";
import { DiagramMeta } from "./diagram-meta";
import { PackageMeta } from "./package-meta";
import { RelationMeta } from "./relation-meta";

export interface RootMeta{
  packageMetas: PackageMeta[];
  classMetas: ClassMeta[];
  diagramMetas: DiagramMeta[];
  relationMetas: RelationMeta[];
}