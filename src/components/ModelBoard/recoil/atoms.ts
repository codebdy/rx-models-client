import { atom, atomFamily } from "recoil";
import { DiagramMeta } from "../meta/DiagramMeta";
import { ClassMeta } from "../meta/ClassMeta";
import { Meta } from "../meta/Meta";
import { RelationMeta, RelationType } from "../meta/RelationMeta";
import { ServiceNode } from "../meta/ServiceNode";
import { X6EdgeMeta } from "../meta/X6EdgeMeta";
import { X6NodeMeta } from "../meta/X6NodeMeta";
import { LineAction } from "./LineAction";

export interface Snapshot {
  diagrams: DiagramMeta[];
  classes: ClassMeta[];
  relations: RelationMeta[];
  x6Nodes: X6NodeMeta[];
  x6Edges: X6EdgeMeta[];
  selectedElement?: string;
  selectedDiagram?: string;
}

export const serviceState = atom<ServiceNode | undefined>({
  key: "local.service",
  default: undefined,
});

export const minMapState = atomFamily<boolean, number>({
  key: "local.minMap",
  default: true,
});

export const publishedIdState = atomFamily<number | undefined, number>({
  key: "local.publishedId",
  default: undefined,
});

export const changedState = atomFamily<boolean, number>({
  key: "local.changed",
  default: false,
});

export const diagramsState = atomFamily<DiagramMeta[], number>({
  key: "local.diagrams",
  default: [],
});

export const metaState = atomFamily<Meta | undefined, number>({
  key: "local.meta",
  default: undefined,
});

export const classesState = atomFamily<ClassMeta[], number>({
  key: "local.classes",
  default: [],
});

export const relationsState = atomFamily<RelationMeta[], number>({
  key: "local.relations",
  default: [],
});

export const x6NodesState = atomFamily<X6NodeMeta[], number>({
  key: "local.x6Nodes",
  default: [],
});

export const x6EdgesState = atomFamily<X6EdgeMeta[], number>({
  key: "local.x6Edges",
  default: [],
});

export const undoListState = atomFamily<Snapshot[], number>({
  key: "local.undoList",
  default: [],
});

export const redoListState = atomFamily<Snapshot[], number>({
  key: "local.redoList",
  default: [],
});

export const selectedElementState = atomFamily<string | undefined, number>({
  key: "local.selectedElement",
  default: undefined,
});

export const selectedDiagramState = atomFamily<string | undefined, number>({
  key: "local.selectedDiagram",
  default: undefined,
});

export const drawingLineState = atomFamily<LineAction | undefined, number>({
  key: "local.drawingLine",
  default: undefined,
});

export const pressedLineTypeState = atomFamily<
  RelationType | undefined,
  number
>({
  key: "local.pressedLineType",
  default: undefined,
});

export const prepareLinkToNodeState = atomFamily<string | undefined, number>({
  key: "local.prepareLinkToNode",
  default: undefined,
});
