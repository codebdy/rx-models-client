import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { EVENT_CLASS_CHANGED, triggerCanvasEvent } from "../GraphCanvas/events";
import { ClassMeta } from "../meta/ClassMeta";
import { classesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useChangeClass(serviceId: number) {
  const backupSnapshot = useBackupSnapshot(serviceId);
  const setEntities = useSetRecoilState(classesState(serviceId));

  const changeEntity = useCallback(
    (cls: ClassMeta) => {
      backupSnapshot();
      setEntities((entities) =>
        entities.map((ent) => (ent.uuid === cls.uuid ? cls : ent))
      );
      triggerCanvasEvent({ name: EVENT_CLASS_CHANGED, detail: cls });
    },
    [backupSnapshot, setEntities]
  );

  return changeEntity;
}
