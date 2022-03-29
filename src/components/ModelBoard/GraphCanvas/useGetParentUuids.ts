import { useCallback } from "react";
import { useGetParentUuid } from "./useGetParentUuid";

export function useGetParentUuids(serviceId: number) {
  const getParentId = useGetParentUuid(serviceId);

  const getParentUuids = useCallback(
    (uuid: string) => {
      const parents: string[] = [];
      let currentUuid: string | undefined = uuid;
      do {
        currentUuid = getParentId(currentUuid);
        if (currentUuid) {
          parents.push(currentUuid);
        }
      } while (currentUuid);

      return parents;
    },
    [getParentId]
  );

  return getParentUuids;
}
