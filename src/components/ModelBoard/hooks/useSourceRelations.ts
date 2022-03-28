import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { RelationType } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";

export function useSourceRelations(entityUuid: string, serviceId: number) {
  const relations = useRecoilValue(relationsState(serviceId));

  const sourceRelations = useMemo(() => {
    return relations.filter(
      (relation) =>
        relation.sourceId === entityUuid &&
        relation.relationType !== RelationType.INHERIT
    );
  }, [entityUuid, relations]);

  return sourceRelations;
}
