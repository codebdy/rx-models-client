import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { RelationType } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";

export function useGetParentUuid(serviceId :number) {
  const relations = useRecoilValue(relationsState(serviceId));
  const getParentUuid = useCallback(
    (uuid: string) => {
      return relations.find(
        (relation) =>
          relation.sourceId === uuid &&
          relation.relationType === RelationType.INHERIT
      )?.targetId;
    },
    [relations]
  );

  return getParentUuid;
}
