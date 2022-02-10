import { useCallback } from "react";
import { useCreateNewEntity } from "./useCreateNewEntity";
import { NODE_INIT_SIZE } from "../GraphCanvas/nodeInitSize";

export function useCreateTempClassNodeForNew() {
  const creatNewEntityMeta = useCreateNewEntity();
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
