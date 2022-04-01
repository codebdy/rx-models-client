import { useCallback } from "react";
import { createId } from "util/createId";
import { Type } from "../meta/Type";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { CONST_ID } from "../meta/Meta";
import { useCreateClassInnerId } from "./useCreateClassInnerId";
import { useGetClassByName } from "./useGetClassByName";

export function useCreateNewClass(serviceId: number) {
  const getClassByName = useGetClassByName(serviceId);
  const createInnerId = useCreateClassInnerId(serviceId);

  const getNewClassName = useCallback(() => {
    const prefix = "NewClass";
    let index = 1;
    while (getClassByName(prefix + index)) {
      index++;
    }

    return prefix + index;
  }, [getClassByName]);

  const createNewClass = useCallback(
    (stereoType: StereoType) => {
      const newClass: ClassMeta = {
        uuid: createId(),
        innerId: createInnerId(),
        name: getNewClassName(),
        stereoType: stereoType,
        attributes:
          stereoType === StereoType.Enum ||
          stereoType === StereoType.ValueObject ||
          stereoType === StereoType.Service
            ? []
            : [
                {
                  uuid: createId(),
                  name: CONST_ID,
                  type: Type.ID,
                  primary: true,
                  typeLabel: Type.ID,
                },
              ],
        methods: [],
      };
      //setEntities((entites) => [...entites, newEntity]);
      return newClass;
    },
    [createInnerId, getNewClassName]
  );

  return createNewClass;
}
