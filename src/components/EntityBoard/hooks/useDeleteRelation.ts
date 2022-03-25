import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { relationsState, x6EdgesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useDeleteRelation(serviceId: number) {
  const setRelation = useSetRecoilState(relationsState(serviceId));
  const setEdges = useSetRecoilState(x6EdgesState(serviceId));

  const backupSnapshot = useBackupSnapshot(serviceId);

  const deleteRelation = useCallback(
    (uuid: string) => {
      backupSnapshot();
      setRelation((relations) =>
        relations.filter((relation) => relation.uuid !== uuid)
      );
      setEdges((edges) => edges.filter((edge) => edge.id !== uuid));
    },
    [backupSnapshot, setEdges, setRelation]
  );

  return deleteRelation;
}
