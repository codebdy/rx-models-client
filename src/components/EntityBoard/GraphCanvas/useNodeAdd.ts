import { Graph, Node } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { EntityMeta } from "../meta/EntityMeta";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  entitiesState,
  selectedDiagramState,
  x6NodesState,
} from "../recoil/atoms";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { useCreateInnerId } from "../hooks/useCreateInnerId";

export function useNodeAdd(graph: Graph | undefined, serviceId: number) {
  const selectedDiagramUuid = useRecoilValue(selectedDiagramState(serviceId));
  const setNodes = useSetRecoilState(x6NodesState(serviceId));
  const setEntities = useSetRecoilState(entitiesState(serviceId));
  const backupSnapshot = useBackupSnapshot(serviceId);
  const createInnerId = useCreateInnerId(serviceId);
  const nodeAdded = useCallback(
    (arg: { node: Node<Node.Properties> }) => {
      const node = arg.node;
      const { isTempForNew, isTempForDrag, packageName, ...rest } =
        arg.node.data;
      const entityMeta = rest as EntityMeta;

      if (!selectedDiagramUuid) {
        return;
      }

      if (isTempForNew) {
        setEntities((entities) => [
          ...entities,
          {
            uuid: entityMeta.uuid,
            innerId: createInnerId(),
            name: entityMeta.name,
            columns: entityMeta.columns,
            entityType: entityMeta.entityType,
          },
        ]);
        node.remove({ disconnectEdges: true });
        backupSnapshot();

        setNodes((nodes) => [
          ...nodes,
          {
            //拖放时有Clone动作，ID被改变，所以取Data里面的ID使用
            id: entityMeta.uuid || "",
            x: node.getPosition().x,
            y: node.getPosition().y,
            width: node.getSize().width,
            height: node.getSize().height,
            diagramUuid: selectedDiagramUuid,
          },
        ]);
      }
      if (isTempForDrag) {
        node.remove({ disconnectEdges: true });
        if (graph?.getCellById(entityMeta.uuid)) {
          return;
        }
        setNodes((nodes) => [
          ...nodes,
          {
            //拖放时有Clone动作，ID被改变，所以取Data里面的ID使用
            id: entityMeta.uuid || "",
            x: node.getPosition().x,
            y: node.getPosition().y,
            width: node.getSize().width,
            height: node.getSize().height,
            diagramUuid: selectedDiagramUuid,
          },
        ]);
      }
    },
    [backupSnapshot, createInnerId, graph, selectedDiagramUuid, setEntities, setNodes]
  );

  useEffect(() => {
    graph?.on("node:added", nodeAdded);
    return () => {
      graph?.off("node:added", nodeAdded);
    };
  }, [graph, nodeAdded]);
}
