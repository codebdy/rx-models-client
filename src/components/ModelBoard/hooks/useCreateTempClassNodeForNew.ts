import { useCallback } from "react";
import { useCreateNewClass } from "./useCreateNewClass";
import { NODE_INIT_SIZE } from "../GraphCanvas/nodeInitSize";
import { StereoType } from "../meta/ClassMeta";

export function useCreateTempClassNodeForNew(serviceId: number) {
  const creatNewClassMeta = useCreateNewClass(serviceId);
  const createTempClassNodeForNew = useCallback(
    (stereoType: StereoType) => {
      const classMeta = creatNewClassMeta();
      return {
        uuid: "entityMeta.uuid",
        ...NODE_INIT_SIZE,
        
        shape: "react-shape",
        data: {
          ...classMeta,
          stereoType,
          isTempForNew: true,
        },
      };
    },
    [creatNewClassMeta]
  );
  return createTempClassNodeForNew;
}
