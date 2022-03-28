import { useCallback } from "react";
import { createId } from "util/createId";
import { ValueType } from "../meta/AttributeMeta";
import { ClassMeta } from "../meta/ClassMeta";

export function useCreateEntityColumn() {
  const createColumn = useCallback((entity: ClassMeta) => {
    let index = 1;
    const namePrefix = "newColumn";
    while (
      // eslint-disable-next-line no-loop-func
      entity.attributes.find((column) => column.name === namePrefix + index)
    ) {
      index++;
    }

    const column = {
      uuid: createId(),
      name: namePrefix + index,
      type: ValueType.String,
    };

    return { ...entity, columns: [...entity.attributes, column] };
  }, []);

  return createColumn;
}
