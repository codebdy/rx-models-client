import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { relationsState } from "../recoil/atoms";

export function useGetParentUuid() {
  const relations = useRecoilValue(relationsState);
  const getParentUuid = useCallback(
    (entityUuid: string) => {
      return relations.find((relation) => relation.sourceId === entityUuid)
        ?.uuid;
    },
    [relations]
  );

  return getParentUuid;
}
