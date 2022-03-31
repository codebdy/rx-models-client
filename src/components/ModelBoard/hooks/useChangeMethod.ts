import { useCallback } from "react";
import { ClassMeta } from "../meta/ClassMeta";
import { MethodMeta } from "../meta/MethodMeta";
import { useChangeClass } from "./useChangeClass";
import { useCheckClassProperyName } from "./useCheckClassProperyName";
import intl from "react-intl-universal";
import { useAlertError } from "recoil/hooks/useAlertError";

export function useChangeMethod(serviceId: number) {
  const changeClass = useChangeClass(serviceId);
  const alertError = useAlertError();
  const chackName = useCheckClassProperyName(serviceId);
  const changeMethod = useCallback(
    (method: MethodMeta, cls: ClassMeta) => {
      if (!chackName(cls.uuid, method.name, method.uuid)) {
        alertError(intl.get("error-name-repeat"));
        return;
      }

      changeClass({
        ...cls,
        methods: cls.methods.map((mthd) =>
          mthd.uuid === method.uuid ? method : mthd
        ),
      });
    },
    [alertError, chackName, changeClass]
  );

  return changeMethod;
}