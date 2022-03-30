import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { EVENT_UNDO_REDO, triggerCanvasEvent } from "../GraphCanvas/events";
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

export function useRedo(serviceId: number) {
  const setUndoList = useSetRecoilState(undoListState(serviceId));
  const [redoList, setRedoList] = useRecoilState(redoListState(serviceId));
  const [diagrams, setDiagrams] = useRecoilState(diagramsState(serviceId));
  const [entities, setEntities] = useRecoilState(classesState(serviceId));
  const [relations, setRelations] = useRecoilState(relationsState(serviceId));
  const [x6Nodes, setX6Nodes] = useRecoilState(x6NodesState(serviceId));
  const [x6Edges, setX6Edges] = useRecoilState(x6EdgesState(serviceId));
  const setChanged = useSetRecoilState(changedState(serviceId));

  const [selectedDiagram, setSelectedDiagram] = useRecoilState(
    selectedDiagramState(serviceId)
  );
  const [selectedElement, setSelectedElement] = useRecoilState(
    selectedElementState(serviceId)
  );

  const undo = useCallback(() => {
    const snapshot = redoList[redoList.length - 1];
    setChanged(true);
    setUndoList((snapshots) => [
      ...snapshots,
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
    setRedoList((snapshots) => snapshots.slice(0, snapshots.length - 1));
    setDiagrams(snapshot.diagrams);
    setEntities(snapshot.classes);
    setRelations(snapshot.relations);
    setX6Nodes(snapshot.x6Nodes);
    setX6Edges(snapshot.x6Edges);
    setSelectedDiagram(snapshot.selectedDiagram);
    setSelectedElement(snapshot.selectedElement);
    triggerCanvasEvent({
      name: EVENT_UNDO_REDO,
    });
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
