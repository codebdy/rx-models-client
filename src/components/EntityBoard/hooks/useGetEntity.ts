import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { entitiesState } from "../recoil/atoms";

export function useGetEntity() {
  const entites = useRecoilValue(entitiesState);

  const getNode = useCallback((uuid: string)=>{
    return entites.find((entity) => entity.uuid === uuid);
  }, [entites]);

  return getNode;
}
