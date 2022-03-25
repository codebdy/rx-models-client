import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { entitiesState } from "../recoil/atoms";

export function useCreateInnerId(serviceId: number) {
  const entities = useRecoilValue(entitiesState(serviceId));
  const findEntityByInnerId = useCallback((id:number)=>{
    for (const entity of entities) {
      if(entity.innerId === id ){
        return entity
      }
    }
  }, [entities])

  const createInnerId = useCallback((): number => {
    let index = 1;
    while (findEntityByInnerId(index)) {
      index++;
    }

    return index;
  }, [findEntityByInnerId]);

  return createInnerId;
}
