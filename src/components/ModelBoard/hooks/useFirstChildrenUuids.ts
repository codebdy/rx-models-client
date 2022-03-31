import { useRecoilValue } from "recoil";
import { RelationType } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";

export function useFirstChildrenUuids(uuid: string, serviceId: number) {
  const relations = useRecoilValue(relationsState(serviceId));

  const children: string[] = [];
  for (const relation of relations) {
    if (
      relation.targetId === uuid &&
      relation.relationType === RelationType.INHERIT
    ) {
      children.push(relation.sourceId);
    }
  }
  return children;
}
