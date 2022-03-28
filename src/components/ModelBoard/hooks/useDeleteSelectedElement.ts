import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { useColumn } from "./useColumn";
import { useDeleteColumn } from "./useDeleteColumn";
import { useDeleteEntity } from "./useDeleteEntity";
import { useDeleteRelation } from "./useDeleteRelation";
import { useClass } from "./useClass";
import { useRelation } from "./useRelation";

/**
 * 本方法不需要备份状态
 */
export function useDeleteSelectedElement(serviceId: number) {
  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementState(serviceId));
  const entity = useClass(selectedElement || "", serviceId);
  const deleteEntity = useDeleteEntity(serviceId);
  const relation = useRelation(selectedElement || "", serviceId);
  const deleteRelation = useDeleteRelation(serviceId);

  const { column } = useColumn(selectedElement || "", serviceId);
  const deletedColumn = useDeleteColumn(serviceId);

  const deleteSelectedElement = useCallback(() => {
    if (entity) {
      deleteEntity(entity.uuid);
    }
    if (relation) {
      deleteRelation(relation.uuid);
    }

    if (column) {
      deletedColumn(column.uuid);
    }
    setSelectedElement(undefined);
  }, [
    column,
    deleteEntity,
    deleteRelation,
    deletedColumn,
    entity,
    relation,
    setSelectedElement,
  ]);

  return deleteSelectedElement;
}
