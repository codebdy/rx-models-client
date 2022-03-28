import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { classesState } from "../recoil/atoms";

export function useAttribute(uuid: string, serviceId: number) {
  const entites = useRecoilValue(classesState(serviceId));

  const rt = useMemo(() => {
    for (const cls of entites) {
      for (const attribute of cls.attributes) {
        if (attribute.uuid === uuid) {
          return { cls, attribute };
        }
      }
    }

    return {}
  }, [entites, uuid]);

  return rt;
}
