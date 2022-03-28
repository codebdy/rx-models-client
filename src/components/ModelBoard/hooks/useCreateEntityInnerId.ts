import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { classesState } from "../recoil/atoms";

export function useCreateEntityInnerId(serviceId: number) {
  const entities = useRecoilValue(classesState(serviceId));
  const findEntityByInnerId = useCallback((id:number)=>{
    for (const entity of entities) {
      if(entity.innerId === id ){
        return entity
      }
    }
  }, [entities])

  const createInnerId = useCallback((): number => {
    //从1001开始表id，前1000个为系统预留
    let index = 1001;
    while (findEntityByInnerId(index)) {
      index++;
    }

    return index;
  }, [findEntityByInnerId]);

  return createInnerId;
}
