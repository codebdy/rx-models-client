import { useCallback } from "react";
import { createId } from "util/createId";
import { ColumnType } from "../meta/ColumnMeta";
import { EntityMeta } from "../meta/EntityMeta";

export function useCreateEntityColumn() {
  const createColumn = useCallback((entity: EntityMeta) => {
    let index = 1;
    const namePrefix = "newColumn";
    while (
      // eslint-disable-next-line no-loop-func
      entity.columns.find((column) => column.name === namePrefix + index)
    ) {
      index++;
    }

    const column = {
      uuid: createId(),
      name: namePrefix + index,
      type: ColumnType.String,
    };

    return { ...entity, columns: [...entity.columns, column] };
  }, []);

  return createColumn;
}
