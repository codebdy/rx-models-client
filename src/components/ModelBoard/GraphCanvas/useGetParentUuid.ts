import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { RelationType } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";

export function useGetParentUuid(serviceId :number) {
  const relations = useRecoilValue(relationsState(serviceId));
  const getParentUuid = useCallback(
    (entityUuid: string) => {
      return relations.find(
        (relation) =>
          relation.sourceId === entityUuid &&
          relation.relationType === RelationType.IMPLEMENTS
      )?.uuid;
    },
    [relations]
  );

  return getParentUuid;
}
