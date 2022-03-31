import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { StereoType } from "../meta/ClassMeta";
import { classesState } from "../recoil/atoms";
import { useGetFirstParentUuids } from "./useGetFirstParentUuids";

export function useRootEntities(serviceId: number) {
  const classes = useRecoilValue(classesState(serviceId));
  const getParentuuids = useGetFirstParentUuids(serviceId);
  const entities = useMemo(() => {
    return classes.filter(
      (cls) =>
        cls.stereoType === StereoType.Entity &&
        getParentuuids(cls.uuid).length === 0
    );
  }, [classes, getParentuuids]);

  return entities;
}
