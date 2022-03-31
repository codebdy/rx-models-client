import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { classesState } from "../recoil/atoms";

export function useMethod(uuid: string, serviceId: number) {
  const classes = useRecoilValue(classesState(serviceId));

  const rt = useMemo(() => {
    for (const cls of classes) {
      for (const method of cls.methods) {
        if (method.uuid === uuid) {
          return { cls, method };
        }
      }
    }

    return {}
  }, [classes, uuid]);

  return rt;
}
