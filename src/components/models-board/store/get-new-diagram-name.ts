import { PackageStore } from "./package";
import intl from 'react-intl-universal';

export function getNewDiagramName(rootStore: PackageStore){
  const prefix = intl.get('add-diagram');
  let index = 1;
  while(rootStore.getDiagramByName(prefix + index)){
    index ++
  }

  return prefix + index;
}