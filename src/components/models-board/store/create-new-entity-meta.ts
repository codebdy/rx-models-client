import { createId } from "util/creat-id";
import { ColumnType } from "../meta/column-meta";
import { getNewEntityName } from "./get-new-entity-name";
import { PackageStore } from "./package";

export function creatNewEntityMeta(rootStore:PackageStore){
  return {
    uuid:createId(),
    name: getNewEntityName(rootStore),
    columns: [
      {
        uuid: createId(),
        name: 'uuid',
        type: ColumnType.Number,
        primary: true,
        generated: true,
      },
    ],
  }
}