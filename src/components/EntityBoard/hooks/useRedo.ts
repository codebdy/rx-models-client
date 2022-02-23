import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
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

export function useRedo() {
  const setUndoList = useSetRecoilState(undoListState);
  const [redoList, setRedoList] = useRecoilState(redoListState);
  const [diagrams, setDiagrams] = useRecoilState(diagramsState);
  const [entities, setEntities] = useRecoilState(entitiesState);
  const [relations, setRelations] = useRecoilState(relationsState);
  const [x6Nodes, setX6Nodes] = useRecoilState(x6NodesState);
  const [x6Edges, setX6Edges] = useRecoilState(x6EdgesState);
  const setChanged = useSetRecoilState(changedState);

  const [selectedDiagram, setSelectedDiagram] =
    useRecoilState(selectedDiagramState);
  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementState);

  const undo = useCallback(() => {
    const snapshot = redoList[redoList.length - 1];
    setChanged(true);
    setUndoList((snapshots) => [
      ...snapshots,
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
    setRedoList((snapshots) => snapshots.slice(0, snapshots.length - 1));
    setDiagrams(snapshot.diagrams);
    setEntities(snapshot.entities);
    setRelations(snapshot.relations);
    setX6Nodes(snapshot.x6Nodes);
    setX6Edges(snapshot.x6Edges);
    setSelectedDiagram(snapshot.selectedDiagram);
    setSelectedElement(snapshot.selectedElement);
  }, [
    diagrams,
    entities,
    redoList,
    relations,
    selectedDiagram,
    selectedElement,
    setChanged,
    setDiagrams,
    setEntities,
    setRedoList,
    setRelations,
    setSelectedDiagram,
    setSelectedElement,
    setUndoList,
    setX6Edges,
    setX6Nodes,
    x6Edges,
    x6Nodes,
  ]);
  return undo;
}
