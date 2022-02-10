import { useCallback } from "react";
import { useCreateNewEntity } from "../hooks/useCreateNewEntity";
import { NODE_INIT_SIZE } from "./nodeInitSize";

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
  }, []);
  return createTempClassNodeForNew;
}
