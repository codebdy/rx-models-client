import { useCallback } from "react";
import { ClassMeta } from "../meta/ClassMeta";
import { useCreateMethod } from "./useCreateMethod";

export function useCreateClassMethod() {
  const createMethod = useCreateMethod()
  const createClassMethod = useCallback((cls: ClassMeta) => {
    const method = createMethod(cls.methods);

    return { ...cls, methods: [...cls.methods, method] };
  }, [createMethod]);

  return createClassMethod;
}
