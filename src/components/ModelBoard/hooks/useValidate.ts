import _ from "lodash";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useAlertError } from "recoil/hooks/useAlertError";
import { classesState } from "../recoil/atoms";
import { useGetClassAssociations } from "./useGetClassAssociations";
import intl from "react-intl-universal";

function hasDuplicates(array: string[]) {
  return _.some(array, function(elt, index) { 
      return array.indexOf(elt) !== index; 
  });
}


export function useValidate(serviceId: number) {
  const classes = useRecoilValue(classesState(serviceId));
  const alertError = useAlertError()
  const getClassAssociations = useGetClassAssociations(serviceId);
  const validate = useCallback(() => {
    for (const cls of classes){
      const names = cls.attributes.map(atr=>atr.name)
      names.push(...cls.methods.map(mth=>mth.name))
      names.push(...getClassAssociations(cls.uuid).map(aso=>aso.name))
      if(hasDuplicates(names.filter(name=>!!name))){
        alertError(intl.get("duplicated-property-error", {cls:cls.name}))
        return false
      }
    }
    return true;
  }, [alertError, classes, getClassAssociations]);

  return validate;
}
