import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { ClassMeta } from "../meta/ClassMeta";
import { classesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useChangeClass(serviceId: number) {
  const backupSnapshot = useBackupSnapshot(serviceId);
  const setEntities = useSetRecoilState(classesState(serviceId));

  const changeEntity = useCallback(
    (entity: ClassMeta) => {
      backupSnapshot();
      setEntities((entities) =>
        entities.map((ent) => (ent.uuid === entity.uuid ? entity : ent))
      );
    },
    [backupSnapshot, setEntities]
  );

  return changeEntity;
}
