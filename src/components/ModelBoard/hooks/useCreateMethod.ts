import { useCallback } from "react";
import { createId } from "util/createId";
import { MethodMeta } from "../meta/MethodMeta";
import { ValueType } from "../meta/ValueType";

export function useCreateMethod() {
  const createMethod = useCallback((methods: MethodMeta[]) => {
    let index = 1;
    const namePrefix = "newMethod";
    while (
      // eslint-disable-next-line no-loop-func
      methods.find((mthd) => mthd.name === namePrefix + index)
    ) {
      index++;
    }

    const method = {
      uuid: createId(),
      name: namePrefix + index,
      args: [],
      type: ValueType.String,
    };

    return method;
  }, []);

  return createMethod;
}
