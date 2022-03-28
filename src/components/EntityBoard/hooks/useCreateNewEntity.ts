import { useCallback } from "react";
import { createId } from "util/createId";
import { ColumnType } from "../meta/ColumnMeta";
import { EntityType } from "../meta/EntityMeta";
import { CONST_ID } from "../meta/Meta";
import { useCreateEntityInnerId } from "./useCreateEntityInnerId";
import { useGetEntityByName } from "./useGetEntityByName";

export function useCreateNewEntity(serviceId: number) {
  const getEntityByName = useGetEntityByName(serviceId);
  const createInnerId = useCreateEntityInnerId(serviceId);

  const getNewEntityName = useCallback(() => {
    const prefix = "NewClass";
    let index = 1;
    while (getEntityByName(prefix + index)) {
      index++;
    }

    return prefix + index;
  }, [getEntityByName]);

  const createNewEntity = useCallback(() => {
    const newEntity = {
      uuid: createId(),
      innerId: createInnerId(),
      name: getNewEntityName(),
      entityType: EntityType.Entity,
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
  }, [createInnerId, getNewEntityName]);

  return createNewEntity;
}
