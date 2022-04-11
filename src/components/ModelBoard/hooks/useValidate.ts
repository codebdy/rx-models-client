import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { classesState } from "../recoil/atoms";
import { useEntities } from "./useEntities";

export function useValidate(serviceId: number) {
  const classes = useRecoilValue(classesState(serviceId));

  const validate = useCallback(() => {
    return true;
  }, []);

  return validate;
}
