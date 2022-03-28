import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { classesState } from "../recoil/atoms";

export function useGetClass(serviceId: number) {
  const classes = useRecoilValue(classesState(serviceId));

  const getEntity = useCallback((uuid: string)=>{
    return classes.find((cls) => cls.uuid === uuid);
  }, [classes]);

  return getEntity;
}
