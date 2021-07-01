import { RelationStore } from "../store/relation";
import { ClassMeta } from "./class-meta";
import { DiagramMeta } from "./diagram-meta";
import { PackageMeta } from "./package-meta";

export interface RootMeta{
  packageMetas: PackageMeta[];
  classMetas: ClassMeta[];
  diagramMetas: DiagramMeta[];
  relationMetas: RelationStore[];
}