import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { classesState } from "../recoil/atoms";

export function useGetClassByName(serviceId: number) {
  const entites = useRecoilValue(classesState(serviceId));

  const getClassByName = useCallback((name: string) => {
    return entites.find((ent) => ent.name === name);
  }, [entites]);

  return getClassByName;
}
