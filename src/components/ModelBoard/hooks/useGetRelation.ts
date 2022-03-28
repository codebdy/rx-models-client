import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { relationsState } from "../recoil/atoms";

export function useGetRelation(serviceId: number) {
  const relations = useRecoilValue(relationsState(serviceId));

  const getRelation = useCallback((uuid: string) => {
    return relations.find((relation) => relation.uuid === uuid);
  }, [relations]);

  return getRelation;
}
