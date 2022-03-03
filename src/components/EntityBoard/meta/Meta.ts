import { IObject } from "do-ents/IObject";
import { EntityMeta } from "./EntityMeta";

export const EntityNameMeta = "Meta";

export interface Meta extends IObject{
  content:{
    entities: EntityMeta[]
  }
}