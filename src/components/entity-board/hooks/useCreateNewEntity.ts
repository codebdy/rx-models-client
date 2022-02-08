import { createId } from "util/creat-id";
import { ColumnType } from "../meta/column-meta";
import { useGetEntityByName } from "./useGetEntityByName";

export function useCreateNewEntity() {
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
    return {
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
  };

  return createNewEntity;
}
