import { useCallback } from "react";
import { ClassMeta } from "../meta/ClassMeta";
import { useCreateAttribute } from "./useCreateAttribute";

export function useCreateClassAttribute() {
  const createAttribute = useCreateAttribute()
  const createClassAttribute = useCallback((cls: ClassMeta) => {
    const attr = createAttribute(cls.attributes);

    return { ...cls, attributes: [...cls.attributes, attr] };
  }, [createAttribute]);

  return createClassAttribute;
}
