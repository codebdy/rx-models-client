import { useCallback } from "react";
import { createId } from "util/createId";
import { ColumnType } from "../meta/ColumnMeta";
import { EntityType } from "../meta/EntityMeta";
import { CONST_ID } from "../meta/Meta";
import { useGetEntityByName } from "./useGetEntityByName";

export function useCreateNewEntity() {
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
      entityType: EntityType.NORMAL,
      columns: [
        {
          uuid: createId(),
          name: CONST_ID,
          type: ColumnType.ID,
          primary: true,
        },
        // {
        //   uuid: createId(),
        //   name: CREATED_AT,
        //   type: ColumnType.Date,
        // },
        // {
        //   uuid: createId(),
        //   name: UPDATED_AT,
        //   type: ColumnType.Date,
        // },
      ],
    };
    //setEntities((entites) => [...entites, newEntity]);
    return newEntity;
  }, [getNewEntityName]);

  return createNewEntity;
}
