import { useCallback } from "react";
import { AttributeMeta } from "../meta/AttributeMeta";
import { ClassMeta } from "../meta/ClassMeta";
import { useChangeEntity } from "./useChangeEntity";

export function useChangeAttribute(serviceId: number) {
  const changeEntity = useChangeEntity(serviceId);

  const changeColumn = useCallback(
    (column: AttributeMeta, entity: ClassMeta) => {
      changeEntity({
        ...entity,
        attributes: entity.attributes.map((col) =>
          col.uuid === column.uuid ? column : col
        ),
      });
    },
    [changeEntity]
  );

  return changeColumn;
}
