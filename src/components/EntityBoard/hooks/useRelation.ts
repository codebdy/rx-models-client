import { useRecoilValue } from "recoil";
import { relationsState } from "../recoil/atoms";

export function useRelation(uuid: string) {
  const relations = useRecoilValue(relationsState);

  return relations.find((relation) => relation.uuid === uuid);
}
