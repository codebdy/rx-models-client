import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { StereoType } from "../meta/ClassMeta";
import { classesState } from "../recoil/atoms";

export function useValueObjects(serviceId: number) {
  const entities = useRecoilValue(classesState(serviceId));
  const interfaces = useMemo(() => {
    return entities.filter((entity) => entity.stereoType === StereoType.ValueObject);
  }, [entities]);

  return interfaces;
}
