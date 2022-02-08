import { atom } from "recoil";
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

export const changedState = atom<boolean>({
  key: "local.changed",
  default: false,
});

export const diagramsState = atom<DiagramMeta[]>({
  key: "local.diagrams",
  default: [],
});

export const entitiesState = atom<EntityMeta[]>({
  key: "local.entities",
  default: [],
});

export const relationsState = atom<RelationMeta[]>({
  key: "local.relations",
  default: [],
});

export const x6NodesState = atom<X6NodeMeta[]>({
  key: "local.x6Nodes",
  default: [],
});

export const x6EdgesState = atom<X6EdgeMeta[]>({
  key: "local.x6Edges",
  default: [],
});

export const undoListState = atom<Snapshot[]>({
  key: "local.undoList",
  default: [],
});

export const redoListState = atom<Snapshot[]>({
  key: "local.redoList",
  default: [],
});

export const selectedElementState = atom<string | undefined>({
  key: "local.selectedElement",
  default: undefined,
});

export const selectedDiagramState = atom<string | undefined>({
  key: "local.selectedDiagram",
  default: undefined,
});
