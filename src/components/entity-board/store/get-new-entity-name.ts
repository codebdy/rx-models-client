import { EntityBoardStore } from "./entity-board-store";
import { PackageStore } from "./package";

export function getNewEntityName(rootStore: PackageStore|EntityBoardStore){
  const prefix = 'NewEntity';
  let index = 1;
  while(rootStore.getEntityByName(prefix + index)){
    index ++
  }

  return prefix + index;
}