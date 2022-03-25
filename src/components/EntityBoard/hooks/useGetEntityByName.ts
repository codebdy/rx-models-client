import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { entitiesState } from "../recoil/atoms";

export function useGetEntityByName(serviceId: number) {
  const entites = useRecoilValue(entitiesState(serviceId));

  const getEntityByName = useCallback((name: string) => {
    return entites.find((ent) => ent.name === name);
  }, [entites]);

  return getEntityByName;
}
