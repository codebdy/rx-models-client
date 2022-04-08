import { Node } from "@antv/x6";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useGetAllParentUuids } from "../hooks/useGetAllParentUuids";
import { useGetClass } from "../hooks/useGetClass";
import { StereoType } from "../meta/ClassMeta";
import { RelationType } from "../meta/RelationMeta";
import { drawingLineState, relationsState } from "../recoil/atoms";

export function useCheckCanLinkTo(serviceId: number) {
  const drawingLine = useRecoilValue(drawingLineState(serviceId));
  const relations = useRecoilValue(relationsState(serviceId));
  const getClass = useGetClass(serviceId);
  const getParentUuids = useGetAllParentUuids(serviceId);
  const checkCanLinkTo = useCallback(
    (node: Node) => {
      if (!drawingLine) {
        return false;
      }

      const source = getClass(drawingLine.sourceNodeId);
      const target = getClass(node.id);
      const isInherit = drawingLine.relationType === RelationType.INHERIT;

      if (!source || !target) {
        return false;
      }

      if (
        target.stereoType === StereoType.Enum ||
        target.stereoType === StereoType.Service ||
        target.stereoType === StereoType.ValueObject 
      ) {
        return false;
      }

      //不能自身继承
      if (isInherit && source.uuid === target.uuid) {
        return false;
      }

      //非虚类不接受子类
      if (isInherit && target.stereoType !== StereoType.Abstract) {
        return false;
      }

      //继承不能重复
      for (const relation of relations) {
        if (
          relation.targetId === target.uuid &&
          relation.sourceId === source.uuid &&
          relation.relationType === RelationType.INHERIT &&
          isInherit
        ) {
          return false;
        }
      }

      //继承不能闭环
      const parentUuids = getParentUuids(target.uuid);
      if (parentUuids.find((uuid) => uuid === source.uuid)) {
        return false;
      }
      return true;
    },
    [drawingLine, getClass, getParentUuids, relations]
  );

  return checkCanLinkTo;
}
