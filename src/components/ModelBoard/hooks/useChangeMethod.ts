import { useCallback } from "react";
import { ClassMeta } from "../meta/ClassMeta";
import { MethodMeta } from "../meta/MethodMeta";
import { useChangeClass } from "./useChangeClass";

export function useChangeMethod(serviceId: number) {
  const changeClass = useChangeClass(serviceId);

  const changeMethod = useCallback(
    (method: MethodMeta, cls: ClassMeta) => {
      changeClass({
        ...cls,
        methods: cls.methods.map((mthd) =>
        mthd.uuid === method.uuid ? method : mthd
        ),
      });
    },
    [changeClass]
  );

  return changeMethod;
}
