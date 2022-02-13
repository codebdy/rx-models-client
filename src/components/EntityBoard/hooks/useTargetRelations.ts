import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { RelationType } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";

export function useTargetRelations(entityUuid: string) {
  const relations = useRecoilValue(relationsState);

  const targetRelations = useMemo(() => {
    return relations.filter(
      (relation) =>
        relation.targetId === entityUuid &&
        relation.relationType !== RelationType.INHERIT
    );
  }, [entityUuid, relations]);

  return targetRelations;
}
