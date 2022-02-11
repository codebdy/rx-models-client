import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { createId } from "util/creat-id";
import { ColumnType } from "../meta/ColumnMeta";
import { entitiesState } from "../recoil/atoms";
import { useGetEntityByName } from "./useGetEntityByName";

export function useCreateNewEntity() {
  const setEntities = useSetRecoilState(entitiesState);
  const getEntityByName = useGetEntityByName();

  const getNewEntityName = useCallback(() => {
    const prefix = "NewEntity";
    let index = 1;
    while (getEntityByName(prefix + index)) {
      index++;
    }

    return prefix + index;
  }, [getEntityByName]);

  const createNewEntity = useCallback(() => {
    const newEntity = {
      uuid: createId(),
      name: getNewEntityName(),
      columns: [
        {
          uuid: createId(),
          name: "id",
          type: ColumnType.Number,
          primary: true,
          generated: true,
        },
      ],
    };
    setEntities((entites) => [...entites, newEntity]);
    return newEntity;
  }, [getNewEntityName, setEntities]);

  return createNewEntity;
}
