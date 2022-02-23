import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  changedState,
  diagramsState,
  entitiesState,
  redoListState,
  relationsState,
  selectedDiagramState,
  selectedElementState,
  undoListState,
  x6EdgesState,
  x6NodesState,
} from "../recoil/atoms";

export function useBackupSnapshot() {
  const diagrams = useRecoilValue(diagramsState);
  const entities = useRecoilValue(entitiesState);
  const relations = useRecoilValue(relationsState);
  const x6Nodes = useRecoilValue(x6NodesState);
  const x6Edges = useRecoilValue(x6EdgesState);
  const selectedDiagram = useRecoilValue(selectedDiagramState);
  const selectedElement = useRecoilValue(selectedElementState);
  const setChanged = useSetRecoilState(changedState);

  const setUndoList = useSetRecoilState(undoListState);
  const setRedoList = useSetRecoilState(redoListState);

  const backupSnapshot = useCallback(() => {
    setChanged(true);
    setUndoList((undoList) => [
      ...undoList,
      {
        diagrams,
        entities,
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
