import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { useColumn } from "./useColumn";
import { useDeleteColumn } from "./useDeleteColumn";
import { useDeleteEntity } from "./useDeleteEntity";
import { useDeleteRelation } from "./useDeleteRelation";
import { useEntity } from "./useEntity";
import { useRelation } from "./useRelation";

/**
 * 本方法不需要备份状态
 */
export function useDeleteSelectedElement() {
  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementState);
  const entity = useEntity(selectedElement || "");
  const deleteEntity = useDeleteEntity();
  const relation = useRelation(selectedElement || "");
  const deleteRelation = useDeleteRelation();

  const { column } = useColumn(selectedElement || "");
  const deletedColumn = useDeleteColumn();

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
