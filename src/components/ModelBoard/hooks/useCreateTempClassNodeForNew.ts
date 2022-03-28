import { useCallback } from "react";
import { useCreateNewClass } from "./useCreateNewClass";
import { NODE_INIT_SIZE } from "../GraphCanvas/nodeInitSize";

export function useCreateTempClassNodeForNew(serviceId: number) {
  const creatNewEntityMeta = useCreateNewClass(serviceId);
  const createTempClassNodeForNew = useCallback(() => {
    const entityMeta = creatNewEntityMeta();
    return {
      uuid: "entityMeta.uuid",
      ...NODE_INIT_SIZE,
      shape: "react-shape",
      data: {
        ...entityMeta,
        isTempForNew: true,
      },
    };
  }, [creatNewEntityMeta]);
  return createTempClassNodeForNew;
}
