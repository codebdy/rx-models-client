import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { relationsState } from "../atoms";

export function useTargetRelations(entityUuid: string){
  const relations = useRecoilValue(relationsState);

  const targetRelations = useMemo(() => {
    return relations.filter((relation) => relation.sourceId === entityUuid);
  }, [entityUuid, relations]);

  return targetRelations;
}