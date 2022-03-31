import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { classesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useDeleteMethod(serviceId: number) {
  const setClasses = useSetRecoilState(classesState(serviceId));
  const backupSnapshot = useBackupSnapshot(serviceId);

  const deleteMethod = useCallback(
    (methodUuid: string) => {
      backupSnapshot();
      setClasses((clses) =>
        clses.map((cls) =>
          cls.methods.find((mthd) => mthd.uuid === methodUuid)
            ? {
                ...cls,
                methods: cls.methods.filter(
                  (mth) => mth.uuid !== methodUuid
                ),
              }
            : cls
        )
      );
    },
    [backupSnapshot, setClasses]
  );

  return deleteMethod;
}
