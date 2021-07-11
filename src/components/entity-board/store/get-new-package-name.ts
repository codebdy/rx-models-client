import intl from 'react-intl-universal';
import { EntityBoardStore } from "./entity-board-store";

export function getNewPackageName(rootStore: EntityBoardStore){
  const prefix = intl.get('add-package');
  let index = 1;
  while(rootStore.getPackageByName(prefix + index)){
    index ++
  }

  return prefix + index;
}