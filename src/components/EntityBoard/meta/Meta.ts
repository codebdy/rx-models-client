import { IObject } from "do-ents/IObject";
import { DiagramMeta } from "./DiagramMeta";
import { EntityMeta } from "./EntityMeta";
import { RelationMeta } from "./RelationMeta";
import { X6EdgeMeta } from "./X6EdgeMeta";
import { X6NodeMeta } from "./X6NodeMeta";

export const EntityNameMeta = "Meta";

export interface Meta extends IObject{
  content:{
    entities: EntityMeta[],
    diagrams: DiagramMeta[],
    relations: RelationMeta[],
    x6Nodes: X6NodeMeta[],
    x6Edges: X6EdgeMeta[]
  }
}