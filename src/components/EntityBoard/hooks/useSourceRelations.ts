import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { RelationType } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";

export function useSourceRelations(entityUuid: string) {
  const relations = useRecoilValue(relationsState);

  const sourceRelations = useMemo(() => {
    return relations.filter(
      (relation) =>
        relation.sourceId === entityUuid &&
        relation.relationType !== RelationType.INHERIT
    );
  }, [entityUuid, relations]);

  return sourceRelations;
}
