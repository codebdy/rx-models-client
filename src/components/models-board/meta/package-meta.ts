import { ClassMeta } from "./class-meta";
import { DiagramMeta } from "./diagram-meta";

export interface PackageMeta{
  id: string;
  name: string;
  parent: PackageMeta | undefined;
  children: PackageMeta[];
  classMetas: ClassMeta[];
  diagramMetas: DiagramMeta[];
}