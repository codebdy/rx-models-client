import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { diagramsState, x6EdgesState, x6NodesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useDeleteDiagram(serviceId: number) {
  const setDiagrams = useSetRecoilState(diagramsState(serviceId));
  const setNodes = useSetRecoilState(x6NodesState(serviceId));
  const setEdges = useSetRecoilState(x6EdgesState(serviceId));

  const backupSnapshot = useBackupSnapshot(serviceId);

  const deleteDiagram = useCallback(
    (diagramUuid: string) => {
      backupSnapshot();
      setDiagrams((diagrams) =>
        diagrams.filter((diagram) => diagram.uuid !== diagramUuid)
      );
      setNodes((nodes) =>
        nodes.filter((node) => node.diagramUuid !== diagramUuid)
      );

      setEdges((edges) =>
        edges.filter((edge) => edge.diagramUuid !== diagramUuid)
      );
    },
    [backupSnapshot, setDiagrams, setEdges, setNodes]
  );

  return deleteDiagram;
}
