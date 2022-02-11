import { atom } from "recoil";
import { DiagramMeta } from "../meta/DiagramMeta";
import { EntityMeta } from "../meta/EntityMeta";
import { RelationMeta, RelationType } from "../meta/RelationMeta";
import { X6EdgeMeta } from "../meta/X6EdgeMeta";
import { X6NodeMeta } from "../meta/X6NodeMeta";
import { LineAction } from "./line-action";

export interface Snapshot {
  diagrams: DiagramMeta[];
  entities: EntityMeta[];
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

export const drawingLineState = atom<LineAction | undefined>({
  key: "local.drawingLine",
  default: undefined,
});

export const pressedLineTypeState = atom<RelationType | undefined>({
  key: "local.pressedLineType",
  default: undefined,
});
