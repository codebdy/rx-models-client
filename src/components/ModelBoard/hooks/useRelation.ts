import { useRecoilValue } from "recoil";
import { relationsState } from "../recoil/atoms";

export function useRelation(uuid: string, serviceId: number) {
  const relations = useRecoilValue(relationsState(serviceId));

  return relations.find((relation) => relation.uuid === uuid);
}
