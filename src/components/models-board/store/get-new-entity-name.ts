import { ModelsBoardStore } from "./models-board";
import { PackageStore } from "./package";

export function getNewEntityName(rootStore: PackageStore|ModelsBoardStore){
  const prefix = 'NewEntity';
  let index = 1;
  while(rootStore.getEntityByName(prefix + index)){
    index ++
  }

  return prefix + index;
}