import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  entitiesState,
  relationsState,
  x6EdgesState,
  x6NodesState,
} from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useDeleteEntity() {
  const setEntites = useSetRecoilState(entitiesState);
  const [relations, setRelations] = useRecoilState(relationsState);
  const setNodes = useSetRecoilState(x6NodesState);
  const setEdges = useSetRecoilState(x6EdgesState);

  const backupSnapshot = useBackupSnapshot();

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
