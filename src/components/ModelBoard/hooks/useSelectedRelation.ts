import { useRecoilValue } from "recoil";
import { relationsState, selectedElementState } from "../recoil/atoms";

export function useSelectedRelation(serviceId: number) {
  const selectedElement = useRecoilValue(selectedElementState(serviceId));
  const relations = useRecoilValue(relationsState(serviceId));

  return relations.find((relation) => relation.uuid === selectedElement);
}
