import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { relationsState, x6EdgesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useDeleteRelation() {
  const setRelation = useSetRecoilState(relationsState);
  const setEdges = useSetRecoilState(x6EdgesState);

  const backupSnapshot = useBackupSnapshot();

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
