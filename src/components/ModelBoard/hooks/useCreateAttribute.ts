import { useCallback } from "react";
import { createId } from "util/createId";
import { AttributeMeta } from "../meta/AttributeMeta";
import { ValueType } from "../meta/ValueType";
import { useGetTypeName } from "./useGetTypeName";

export function useCreateAttribute(serviceId: number, prefix?: string) {
  const getTypeName = useGetTypeName(serviceId);

  const createAttribute = useCallback(
    (attributes: AttributeMeta[]) => {
      let index = 1;
      const namePrefix = prefix || "newAttribute";
      while (
        // eslint-disable-next-line no-loop-func
        attributes.find((attr) => attr.name === namePrefix + index)
      ) {
        index++;
      }

      const attr = {
        uuid: createId(),
        name: namePrefix + index,
        type: ValueType.String,
        typeLabel: getTypeName(ValueType.String),
      };

      return attr;
    },
    [getTypeName, prefix]
  );

  return createAttribute;
}
