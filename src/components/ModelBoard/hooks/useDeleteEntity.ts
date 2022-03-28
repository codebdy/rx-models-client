import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  classesState,
  relationsState,
  x6EdgesState,
  x6NodesState,
} from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useDeleteEntity(serviceId: number) {
  const setEntites = useSetRecoilState(classesState(serviceId));
  const [relations, setRelations] = useRecoilState(relationsState(serviceId));
  const setNodes = useSetRecoilState(x6NodesState(serviceId));
  const setEdges = useSetRecoilState(x6EdgesState(serviceId));

  const backupSnapshot = useBackupSnapshot(serviceId);

  const deleteEntity = useCallback(
    (entityUuid: string) => {
      backupSnapshot();
      setEntites((entites) =>
        entites.filter((entity) => entity.uuid !== entityUuid)
      );
      const relationIds = relations
        .filter(
          (relation) =>
            relation.sourceId === entityUuid || relation.targetId === entityUuid
        )
        .map((relation) => relation.uuid);
      setRelations((relations) =>
        relations.filter((relation) => !relationIds.find(uuid=>relation.uuid === uuid))
      );

      setNodes((nodes) => nodes.filter((node) => node.id !== entityUuid));

      setEdges((edges) => edges.filter((edge) => !(edge.id in relationIds)));
    },
    [backupSnapshot, relations, setEdges, setEntites, setNodes, setRelations]
  );

  return deleteEntity;
}
