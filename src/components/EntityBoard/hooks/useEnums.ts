import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { EntityType } from "../meta/EntityMeta";
import { entitiesState } from "../recoil/atoms";

export function useEnums() {
  const entities = useRecoilValue(entitiesState);
  const enums = useMemo(() => {
    return entities.filter((entity) => entity.entityType === EntityType.ENUM);
  }, [entities]);

  return enums;
}
