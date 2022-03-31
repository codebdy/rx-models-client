import { useCallback } from "react";
import { createId } from "util/createId";
import { MethodMeta, MethodType } from "../meta/MethodMeta";
import { ValueType } from "../meta/ValueType";
import { useGetTypeLabel } from "./useGetTypeLabel";

export function useCreateMethod(serviceId: number) {
  const getTypeName = useGetTypeLabel(serviceId);

  const createMethod = useCallback(
    (methods: MethodMeta[]) => {
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
        typeLabel: getTypeName(ValueType.String),
        methodType: MethodType.Script,
      };

      return method;
    },
    [getTypeName]
  );

  return createMethod;
}
