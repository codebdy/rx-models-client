import { useCallback } from "react";
import { createId } from "util/createId";
import { AttributeMeta } from "../meta/AttributeMeta";
import { ValueType } from "../meta/ValueType";

export function useCreateAttribute(){
  const createName = useCallback((attributes: AttributeMeta[]) => {
    let index = 1;
    const namePrefix = "newAttribute";
    while (
      // eslint-disable-next-line no-loop-func
      attributes.find((attr) => attr.name === namePrefix + index)
    ) {
      index++;
    }

    const attr = {
      uuid: createId(),
      name: namePrefix + index,
      type: ValueType.String,
    };

    return attr;
  }, []);

  return createName;
}