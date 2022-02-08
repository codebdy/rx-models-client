import { useSetRecoilState } from "recoil";
import { createId } from "util/creat-id";
import { ColumnType } from "../meta/column-meta";
import { entitesState } from "../recoil/atoms";
import { useGetEntityByName } from "./useGetEntityByName";

export function useCreateNewEntity() {
  const setEntities = useSetRecoilState(entitesState);
  const getEntityByName = useGetEntityByName();

  const getNewEntityName = () => {
    const prefix = "NewEntity";
    let index = 1;
    while (getEntityByName(prefix + index)) {
      index++;
    }

    return prefix + index;
  };

  const createNewEntity = () => {
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
  };

  return createNewEntity;
}
