import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { StereoType } from "../meta/ClassMeta";
import { classesState } from "../recoil/atoms";

export function useEnums(serviceId: number) {
  const entities = useRecoilValue(classesState(serviceId));
  const enums = useMemo(() => {
    return entities.filter((entity) => entity.stereoType === StereoType.Enum);
  }, [entities]);

  return enums;
}
