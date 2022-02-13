import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { RelationType } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";

export function useGetParentUuid() {
  const relations = useRecoilValue(relationsState);
  const getParentUuid = useCallback(
    (entityUuid: string) => {
      return relations.find(
        (relation) =>
          relation.sourceId === entityUuid &&
          relation.relationType === RelationType.INHERIT
      )?.uuid;
    },
    [relations]
  );

  return getParentUuid;
}
