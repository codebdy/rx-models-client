import { useCallback } from "react";
import { ColumnMeta } from "../meta/ColumnMeta";
import { EntityMeta } from "../meta/EntityMeta";
import { useChangeEntity } from "./useChangeEntity";

export function useChangeColumn() {
  const changeEntity = useChangeEntity();

  const changeColumn = useCallback(
    (column: ColumnMeta, entity: EntityMeta) => {
      changeEntity({
        ...entity,
        columns: entity.columns.map((col) =>
          col.uuid === column.uuid ? column : col
        ),
      });
    },
    [changeEntity]
  );

  return changeColumn;
}
