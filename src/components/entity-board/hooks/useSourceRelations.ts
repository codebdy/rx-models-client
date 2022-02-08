import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { relationsState } from "../recoil/atoms";

export function useSourceRelations(entityUuid: string) {
  const relations = useRecoilValue(relationsState);

  const sourceRelations = useMemo(() => {
    return relations.filter((relation) => relation.sourceId === entityUuid);
  }, [entityUuid, relations]);

  return sourceRelations;
}
