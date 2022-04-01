import { useCallback } from "react";
import { Type } from "../meta/Type";
import { useGetClass } from "./useGetClass";

export function useGetTypeLabel(serviceId: number) {
  const getClass = useGetClass(serviceId);

  const typeName = useCallback(
    (type: Type, typeUuid?: string): string => {
      if (
        type === Type.ID ||
        type === Type.Boolean ||
        type === Type.Int ||
        type === Type.Float ||
        type === Type.String ||
        type === Type.Date ||
        type === Type.IDArray ||
        type === Type.IntArray ||
        type === Type.FloatArray ||
        type === Type.StringArray ||
        type === Type.DateArray
      ) {
        return type;
      } else {
        const cls = getClass(typeUuid || "");
        if (!cls) {
          return "";
        }
        if (
          type === Type.Enum ||
          type === Type.ValueObject ||
          type === Type.Entity
        ) {
          return cls.name;
        } else if (
          type === Type.EnumArray ||
          type === Type.ValueObjectArray ||
          type === Type.EntityArray
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
