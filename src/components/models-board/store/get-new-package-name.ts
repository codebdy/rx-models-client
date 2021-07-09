import intl from 'react-intl-universal';
import { ModelsBoardStore } from "./models-board";

export function getNewPackageName(rootStore: ModelsBoardStore){
  const prefix = intl.get('add-package');
  let index = 1;
  while(rootStore.getPackageByName(prefix + index)){
    index ++
  }

  return prefix + index;
}