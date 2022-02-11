import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { EntityMeta } from "../meta/EntityMeta";
import { entitiesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useChangeEntity() {
  const backupSnapshot = useBackupSnapshot();
  const setEntities = useSetRecoilState(entitiesState);

  const changeEntity = useCallback(
    (entity: EntityMeta) => {
      backupSnapshot();
      setEntities((entities) =>
        entities.map((ent) => (ent.uuid === entity.uuid ? entity : ent))
      );
    },
    [backupSnapshot, setEntities]
  );

  return changeEntity;
}
