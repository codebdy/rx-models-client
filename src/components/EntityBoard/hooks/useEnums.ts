import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { EntityType } from "../meta/EntityMeta";
import { entitiesState } from "../recoil/atoms";

export function useEnums(serviceId: number) {
  const entities = useRecoilValue(entitiesState(serviceId));
  const enums = useMemo(() => {
    return entities.filter((entity) => entity.entityType === EntityType.Enum);
  }, [entities]);

  return enums;
}
