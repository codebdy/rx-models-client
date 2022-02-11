import { useRecoilValue } from "recoil";
import { relationsState, selectedElementState } from "../recoil/atoms";

export function useSelectedRelation() {
  const selectedElement = useRecoilValue(selectedElementState);
  const relations = useRecoilValue(relationsState);

  return relations.find((relation) => relation.uuid === selectedElement);
}
