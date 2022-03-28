import { useCallback } from "react";
import { createId } from "util/createId";
import { ValueType } from "../meta/ValueType";
import { ClassMeta } from "../meta/ClassMeta";

export function useCreateClassAttribute() {
  const createAttribute = useCallback((entity: ClassMeta) => {
    let index = 1;
    const namePrefix = "newAttribute";
    while (
      // eslint-disable-next-line no-loop-func
      entity.attributes.find((attr) => attr.name === namePrefix + index)
    ) {
      index++;
    }

    const attr = {
      uuid: createId(),
      name: namePrefix + index,
      type: ValueType.String,
    };

    return { ...entity, attributes: [...entity.attributes, attr] };
  }, []);

  return createAttribute;
}
