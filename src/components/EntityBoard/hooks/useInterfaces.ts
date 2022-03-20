import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { EntityType } from "../meta/EntityMeta";
import { entitiesState } from "../recoil/atoms";

export function useInterfaces() {
  const entities = useRecoilValue(entitiesState);
  const interfaces = useMemo(() => {
    return entities.filter((entity) => entity.entityType === EntityType.INTERFACE);
  }, [entities]);

  return interfaces;
}
