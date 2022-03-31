import { useCallback } from "react";
import { useAlertError } from "recoil/hooks/useAlertError";
import { AttributeMeta } from "../meta/AttributeMeta";
import { ClassMeta } from "../meta/ClassMeta";
import { useChangeClass } from "./useChangeClass";
import intl from "react-intl-universal";
import { useCheckClassProperyName } from "./useCheckClassProperyName";

export function useChangeAttribute(serviceId: number) {
  const changeEntity = useChangeClass(serviceId);
  const alertError = useAlertError();
  const chackName = useCheckClassProperyName(serviceId);

  const changeAttribute = useCallback(
    (attr: AttributeMeta, cls: ClassMeta) => {
      if (!chackName(cls.uuid, attr.name, attr.uuid)) {
        alertError(intl.get("error-name-repeat"));
        return;
      }
      changeEntity({
        ...cls,
        attributes: cls.attributes.map((col) =>
          col.uuid === attr.uuid ? attr : col
        ),
      });
    },
    [alertError, chackName, changeEntity]
  );

  return changeAttribute;
}
