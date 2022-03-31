import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { classesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useDeleteAttribute(serviceId: number) {
  const setClasses = useSetRecoilState(classesState(serviceId));
  const backupSnapshot = useBackupSnapshot(serviceId);

  const deleteAttribute = useCallback(
    (attributeUuid: string) => {
      backupSnapshot();
      setClasses((clses) =>
        clses.map((cls) =>
          cls.attributes.find((attr) => attr.uuid === attributeUuid)
            ? {
                ...cls,
                attributes: cls.attributes.filter(
                  (atr) => atr.uuid !== attributeUuid
                ),
              }
            : cls
        )
      );
    },
    [backupSnapshot, setClasses]
  );

  return deleteAttribute;
}
