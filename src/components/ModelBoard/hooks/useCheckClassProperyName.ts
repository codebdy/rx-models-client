import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { relationsState } from "../recoil/atoms";
import { useGetClass } from "./useGetClass";

export function useCheckClassProperyName(serviceId: number) {
  const getClass = useGetClass(serviceId);
  const relations = useRecoilValue(relationsState(serviceId));

  /**
   * propertyUuid 如果关联性质，为类UUID+关联UUID
   */
  const checkName = useCallback(
    (classUuid: string, propertyName: string, propertyUuid: string) => {
      const cls = getClass(classUuid);
      if (!cls) {
        return true;
      }
      const names: string[] = [];
      for (const relation of relations) {
        if (
          relation.sourceId === classUuid &&
          relation.sourceId + relation.uuid !== propertyUuid
        ) {
          relation.roleOfTarget && names.push(relation.roleOfTarget);
        }
        if (
          relation.targetId === classUuid &&
          relation.targetId + relation.uuid !== propertyUuid
        ) {
          relation.roleOfSource && names.push(relation.roleOfSource);
        }
      }

      for (const attr of cls.attributes) {
        if (attr.uuid !== propertyUuid) {
          names.push(attr.name);
        }
      }

      for (const method of cls.methods) {
        if (method.uuid !== propertyUuid) {
          names.push(method.name);
        }
      }

      return !names.find((name) => name === propertyName);
    },
    [getClass, relations]
  );

  return checkName;
}
