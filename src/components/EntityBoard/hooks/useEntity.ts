import { useRecoilValue } from "recoil";
import { entitiesState } from "../recoil/atoms";

export function useEntity(uuid: string, serviceId: number) {
  const entites = useRecoilValue(entitiesState(serviceId));

  return entites.find((entity) => entity.uuid === uuid);
}
