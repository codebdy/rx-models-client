import { useCallback } from "react";
import { ClassMeta } from "../meta/ClassMeta";
import { useCreateAttribute } from "./useCreateAttribute";

export function useCreateClassAttribute() {
  const createAttribute = useCreateAttribute()
  const createClassAttribute = useCallback((entity: ClassMeta) => {
    const attr = createAttribute(entity.attributes);

    return { ...entity, attributes: [...entity.attributes, attr] };
  }, [createAttribute]);

  return createClassAttribute;
}
