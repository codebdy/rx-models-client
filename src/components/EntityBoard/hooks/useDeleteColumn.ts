import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { entitiesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useDeleteColumn() {
  const setEntities = useSetRecoilState(entitiesState);
  const backupSnapshot = useBackupSnapshot();

  const deleteColumn = useCallback(
    (columnUuid: string) => {
      backupSnapshot();
      setEntities((entities) =>
        entities.map((entity) =>
          entity.columns.find((col) => col.uuid === columnUuid)
            ? {
                ...entity,
                columns: entity.columns.filter(
                  (col) => col.uuid !== columnUuid
                ),
              }
            : entity
        )
      );
    },
    [backupSnapshot, setEntities]
  );

  return deleteColumn;
}
