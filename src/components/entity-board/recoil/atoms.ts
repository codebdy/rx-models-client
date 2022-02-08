import { atom, atomFamily } from "recoil";
import { DiagramMeta } from "../meta/diagram-meta";
import { EntityMeta } from "../meta/entity-meta";
import { RelationMeta } from "../meta/relation-meta";
import { X6EdgeMeta } from "../meta/x6-edge-meta";
import { X6NodeMeta } from "../meta/x6-node-meta";

export interface Snapshot {
  diagrams: DiagramMeta[];
  entites: EntityMeta[];
  relations: RelationMeta[];
  x6Nodes: X6NodeMeta[];
  x6Edges: X6EdgeMeta[];
}

export const diagramsState = atom<DiagramMeta[]>({
  key: "local.diagrams",
  default: [],
});

export const entitesState = atom<EntityMeta[]>({
  key: "local.entites",
  default: [],
});

export const relationsState = atom<RelationMeta[]>({
  key: "local.relations",
  default: [],
});

export const x6NodesState = atomFamily<X6NodeMeta[], string>({
  key: "local.x6Nodes",
  default: [],
});

export const x6EdgesState = atomFamily<X6EdgeMeta[], string>({
  key: "local.x6Edges",
  default: [],
});

export const undoList = atom<Snapshot[]>({
  key: "local.undoList",
  default: [],
});

export const redoList = atom<Snapshot[]>({
  key: "local.redoList",
  default: [],
});

