import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { RelationMeta } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useChangeRelation() {
  const backupSnapshot = useBackupSnapshot();
  const setRelations = useSetRecoilState(relationsState);

  const changeRelation = useCallback(
    (relation: RelationMeta) => {
      backupSnapshot();

      setRelations((relations) =>
        relations.map((rel) => (rel.uuid === relation.uuid ? relation : rel))
      );
    },
    [backupSnapshot, setRelations]
  );

  return changeRelation;
}
