import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { relationsState } from "../recoil/atoms";

export function useGetRelation() {
  const relations = useRecoilValue(relationsState);

  const getRelation = useCallback((uuid: string) => {
    return relations.find((relation) => relation.uuid === uuid);
  }, [relations]);

  return getRelation;
}
