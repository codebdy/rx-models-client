import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useAlertError } from "recoil/hooks/useAlertError";
import { EVENT_CLASS_CHANGED, triggerCanvasEvent } from "../GraphCanvas/events";
import { ClassMeta } from "../meta/ClassMeta";
import { classesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";
import intl from "react-intl-universal";

export function useChangeClass(serviceId: number) {
  const backupSnapshot = useBackupSnapshot(serviceId);
  const setClasses = useSetRecoilState(classesState(serviceId));
  const classes = useRecoilValue(classesState(serviceId));
  const alertError = useAlertError();

  const changeClass = useCallback(
    (cls: ClassMeta) => {
      if (
        classes
          .filter((cl) => cl.uuid !== cls.uuid)
          .find((cl) => cl.name === cls.name)
      ) {
        alertError(intl.get("error-name-repeat"));
        return;
      }
      backupSnapshot();
      setClasses((entities) =>
        entities.map((ent) => (ent.uuid === cls.uuid ? cls : ent))
      );
      triggerCanvasEvent({ name: EVENT_CLASS_CHANGED, detail: cls });
    },
    [alertError, backupSnapshot, classes, setClasses]
  );

  return changeClass;
}
