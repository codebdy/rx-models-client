import { useCallback } from "react";
import { ClassMeta } from "../meta/ClassMeta";
import { useChangeClass } from "./useChangeClass";
import { useCreateAttribute } from "./useCreateAttribute";

export function useCreateClassAttribute(serviceId: number) {
  const changeClass = useChangeClass(serviceId);
  const createAttribute = useCreateAttribute(serviceId);
  const createClassAttribute = useCallback(
    (cls: ClassMeta) => {
      const attr = createAttribute(cls.attributes);

      changeClass({ ...cls, attributes: [...cls.attributes, attr] });
    },
    [changeClass, createAttribute]
  );

  return createClassAttribute;
}
