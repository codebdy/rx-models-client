import { useCallback, useRef } from "react";
import { useRecoilValue } from "recoil";
import { entitiesState } from "../recoil/atoms";

export function useGetEntity() {
  const entities = useRecoilValue(entitiesState);
  const entitiesRef = useRef(entities);
  entitiesRef.current = entities;

  const getEntity = useCallback(
    (uuid: string) => {
      return entitiesRef.current.find((entity) => entity.uuid === uuid);
    },
    []
  );

  return getEntity;
}
