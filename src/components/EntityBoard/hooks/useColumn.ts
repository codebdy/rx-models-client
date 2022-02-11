import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { entitiesState } from "../recoil/atoms";

export function useColumn(uuid: string) {
  const entites = useRecoilValue(entitiesState);

  const rt = useMemo(() => {
    for (const entity of entites) {
      for (const column of entity.columns) {
        if (column.uuid === uuid) {
          return { entity, column };
        }
      }
    }

    return {}
  }, [entites, uuid]);

  return rt;
}
