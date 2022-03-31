import { useCallback } from "react";
import { ClassMeta } from "../meta/ClassMeta";
import { useChangeClass } from "./useChangeClass";
import { useCreateMethod } from "./useCreateMethod";

export function useCreateClassMethod(serviceId: number) {
  const changeClass = useChangeClass(serviceId);
  const createMethod = useCreateMethod(serviceId);
  const createClassMethod = useCallback(
    (cls: ClassMeta) => {
      const method = createMethod(cls.methods);

      changeClass({ ...cls, methods: [...cls.methods, method] });
    },
    [changeClass, createMethod]
  );

  return createClassMethod;
}
