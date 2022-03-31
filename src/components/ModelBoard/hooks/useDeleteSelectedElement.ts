import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { useAttribute } from "./useAttribute";
import { useDeleteAttribute } from "./useDeleteAttribute";
import { useDeleteClass } from "./useDeleteClass";
import { useDeleteRelation } from "./useDeleteRelation";
import { useClass } from "./useClass";
import { useRelation } from "./useRelation";
import { useMethod } from "./useMethod";
import { useDeleteMethod } from "./useDeleteMethod";

/**
 * 本方法不需要备份状态
 */
export function useDeleteSelectedElement(serviceId: number) {
  const [selectedElement, setSelectedElement] = useRecoilState(
    selectedElementState(serviceId)
  );
  const cls = useClass(selectedElement || "", serviceId);
  const deleteClass = useDeleteClass(serviceId);
  const relation = useRelation(selectedElement || "", serviceId);
  const deleteRelation = useDeleteRelation(serviceId);

  const { attribute } = useAttribute(selectedElement || "", serviceId);
  const { method } = useMethod(selectedElement || "", serviceId);
  const deletedAttribute = useDeleteAttribute(serviceId);
  const deleteMethod = useDeleteMethod(serviceId);

  const deleteSelectedElement = useCallback(() => {
    if (cls) {
      deleteClass(cls.uuid);
    }
    if (relation) {
      deleteRelation(relation.uuid);
    }

    if (attribute) {
      deletedAttribute(attribute.uuid);
    }

    if (method) {
      deleteMethod(method.uuid);
    }
    setSelectedElement(undefined);
  }, [
    cls,
    relation,
    attribute,
    method,
    setSelectedElement,
    deleteClass,
    deleteRelation,
    deletedAttribute,
    deleteMethod,
  ]);

  return deleteSelectedElement;
}
