import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { EntityType } from "../meta/EntityMeta";
import { entitiesState } from "../recoil/atoms";

export function useInterfaces(serviceId: number) {
  const entities = useRecoilValue(entitiesState(serviceId));
  const interfaces = useMemo(() => {
    return entities.filter((entity) => entity.entityType === EntityType.INTERFACE);
  }, [entities]);

  return interfaces;
}
