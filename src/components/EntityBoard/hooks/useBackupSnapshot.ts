import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  diagramsState,
  entitiesState,
  redoListState,
  relationsState,
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

  const setUndoList = useSetRecoilState(undoListState);
  const setRedoList = useSetRecoilState(redoListState);

  const backupSnapshot = useCallback(() => {
    setUndoList((undoList) => [
      ...undoList,
      { diagrams, entities, relations, x6Nodes, x6Edges },
    ]);
    setRedoList([]);
  }, [
    diagrams,
    entities,
    relations,
    setRedoList,
    setUndoList,
    x6Edges,
    x6Nodes,
  ]);

  return backupSnapshot;
}
