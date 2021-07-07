import { createId } from "util/creat-id";
import { ColumnType } from "../meta/column-meta";
import { getNewEntityName } from "./get-new-entity-name";
import { PackageStore } from "./package";

export function creatNewEntityMeta(rootStore:PackageStore){
  return {
    id:createId(),
    name: getNewEntityName(rootStore),
    columns: [
      {
        id: createId(),
        name: 'id',
        type: ColumnType.Number,
        primary: true,
        generated: true,
      },
    ],
  }
}