import { useRecoilValue } from "recoil";
import { entitiesState } from "../recoil/atoms";

export function useEntity(uuid: string) {
  const entites = useRecoilValue(entitiesState);

  return entites.find((entity) => entity.uuid === uuid);
}
