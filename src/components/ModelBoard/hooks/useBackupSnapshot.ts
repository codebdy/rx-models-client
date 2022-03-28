import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  changedState,
  diagramsState,
  classesState,
  redoListState,
  relationsState,
  selectedDiagramState,
  selectedElementState,
  undoListState,
  x6EdgesState,
  x6NodesState,
} from "../recoil/atoms";

export function useBackupSnapshot(serviceId: number) {
  const diagrams = useRecoilValue(diagramsState(serviceId));
  const entities = useRecoilValue(classesState(serviceId));
  const relations = useRecoilValue(relationsState(serviceId));
  const x6Nodes = useRecoilValue(x6NodesState(serviceId));
  const x6Edges = useRecoilValue(x6EdgesState(serviceId));
  const selectedDiagram = useRecoilValue(selectedDiagramState(serviceId));
  const selectedElement = useRecoilValue(selectedElementState(serviceId));
  const setChanged = useSetRecoilState(changedState(serviceId));

  const setUndoList = useSetRecoilState(undoListState(serviceId));
  const setRedoList = useSetRecoilState(redoListState(serviceId));

  const backupSnapshot = useCallback(() => {
    setChanged(true);
    setUndoList((undoList) => [
      ...undoList,
      {
        diagrams,
        classes: entities,
        relations,
        x6Nodes,
        x6Edges,
        selectedDiagram,
        selectedElement,
      },
    ]);
    setRedoList([]);
  }, [
    diagrams,
    entities,
    relations,
    selectedDiagram,
    selectedElement,
    setChanged,
    setRedoList,
    setUndoList,
    x6Edges,
    x6Nodes,
  ]);

  return backupSnapshot;
}
