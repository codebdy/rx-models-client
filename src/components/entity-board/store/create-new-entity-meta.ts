import { createId } from "util/creat-id";
import { ColumnType } from "../meta/column-meta";
import { getNewEntityName } from "./get-new-entity-name";
import { EntityBoardStore } from "./entity-board";
import { PackageStore } from "./package";

export function creatNewEntityMeta(rootStore:PackageStore | EntityBoardStore){
  return {
    uuid:createId(),
    name: getNewEntityName(rootStore),
    columns: [
      {
        uuid: createId(),
        name: 'id',
        type: ColumnType.Number,
        primary: true,
        generated: true,
      },
    ],
  }
}