import { useRecoilValue } from "recoil";
import { entitesState } from "../atoms";

export function useEntity(uuid: string) {
  const entites = useRecoilValue(entitesState);

  return entites.find((entity) => entity.uuid === uuid);
}
