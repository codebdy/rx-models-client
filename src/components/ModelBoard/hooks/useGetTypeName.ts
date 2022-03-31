import { useCallback } from "react";
import { ValueType } from "../meta/ValueType";
import { useGetClass } from "./useGetClass";

export function useGetTypeName(serviceId: number) {
  const getClass = useGetClass(serviceId);

  const typeName = useCallback(
    (type: ValueType, typeUuid?: string): string => {
      if (
        type === ValueType.ID ||
        type === ValueType.Boolean ||
        type === ValueType.Int ||
        type === ValueType.Float ||
        type === ValueType.String ||
        type === ValueType.Date ||
        type === ValueType.IDArray ||
        type === ValueType.IntArray ||
        type === ValueType.FloatArray ||
        type === ValueType.StringArray ||
        type === ValueType.DateArray
      ) {
        return type;
      } else {
        const cls = getClass(typeUuid || "");
        if (!cls) {
          return "";
        }
        if (
          type === ValueType.Enum ||
          type === ValueType.ValueObject ||
          type === ValueType.Entity
        ) {
          return cls.name;
        } else if (
          type === ValueType.EnumArray ||
          type === ValueType.ValueObjectArray ||
          type === ValueType.EntityArray
        ) {
          return `${cls.name}[]`;
        }

        return "";
      }
    },
    [getClass]
  );

  return typeName;
}
