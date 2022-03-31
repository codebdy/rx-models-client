import { useCallback } from "react";
import { AttributeMeta } from "../meta/AttributeMeta";
import { ClassMeta } from "../meta/ClassMeta";
import { useChangeClass } from "./useChangeClass";

export function useChangeAttribute(serviceId: number) {
  const changeEntity = useChangeClass(serviceId);

  const changeAttribute = useCallback(
    (attr: AttributeMeta, cls: ClassMeta) => {
      changeEntity({
        ...cls,
        attributes: cls.attributes.map((col) =>
          col.uuid === attr.uuid ? attr : col
        ),
      });
    },
    [changeEntity]
  );

  return changeAttribute;
}
