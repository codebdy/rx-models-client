import { useRecoilValue } from "recoil";
import { entitesState } from "../recoil/atoms";

export function useEntity(uuid: string) {
  const entites = useRecoilValue(entitesState);

  return entites.find((entity) => entity.uuid === uuid);
}
