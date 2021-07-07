import { PackageStore } from "./package";
import intl from 'react-intl-universal';

export function getNewPackageName(rootStore: PackageStore){
  const prefix = intl.get('add-package');
  let index = 1;
  while(rootStore.getPackageByName(prefix + index)){
    index ++
  }

  return prefix + index;
}