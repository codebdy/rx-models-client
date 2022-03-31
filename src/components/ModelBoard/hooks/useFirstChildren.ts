import { useRecoilValue } from "recoil";
import { ClassMeta } from "../meta/ClassMeta";
import { RelationType } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";
import { useGetClass } from "./useGetClass";

export function useFirstChildren(uuid: string, serviceId: number) {
  const getClass = useGetClass(serviceId);
  const relations = useRecoilValue(relationsState(serviceId));

  const children: ClassMeta[] = [];
  for (const relation of relations) {
    if (
      relation.sourceId === uuid &&
      relation.relationType === RelationType.INHERIT
    ) {
      const cls = getClass(relation.targetId);
      console.assert(cls, "Can not find class by id");
      cls && children.push(cls);
    }
  }
  return children;
}
