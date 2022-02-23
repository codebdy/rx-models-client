import { IInstance } from "do-ents/IInstance";
import { EntityMeta } from "./EntityMeta";

export const EntityNameMeta = "Meta";

export interface Meta extends IInstance{
  content:{
    entities: EntityMeta[]
  }
}