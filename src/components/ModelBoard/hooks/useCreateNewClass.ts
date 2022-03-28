import { useCallback } from "react";
import { createId } from "util/createId";
import { ValueType } from "../meta/ValueType";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { CONST_ID } from "../meta/Meta";
import { useCreateEntityInnerId } from "./useCreateEntityInnerId";
import { useGetClassByName } from "./useGetClassByName";

export function useCreateNewClass(serviceId: number) {
  const getClassByName = useGetClassByName(serviceId);
  const createInnerId = useCreateEntityInnerId(serviceId);

  const getNewClassName = useCallback(() => {
    const prefix = "NewClass";
    let index = 1;
    while (getClassByName(prefix + index)) {
      index++;
    }

    return prefix + index;
  }, [getClassByName]);

  const createNewClass = useCallback(() => {
    const newClass:ClassMeta = {
      uuid: createId(),
      innerId: createInnerId(),
      name: getNewClassName(),
      stereoType: StereoType.Entity,
      attributes: [
        {
          uuid: createId(),
          name: CONST_ID,
          type: ValueType.ID,
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
      methods:[]
    };
    //setEntities((entites) => [...entites, newEntity]);
    return newClass;
  }, [createInnerId, getNewClassName]);

  return createNewClass;
}
