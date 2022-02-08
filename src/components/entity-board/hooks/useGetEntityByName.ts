import { useRecoilValue } from "recoil";
import { entitiesState } from "../recoil/atoms";

export function useGetEntityByName() {
  const entites = useRecoilValue(entitiesState);

  const getEntityByName = (name: string) => {
    return entites.find((ent) => ent.name === name);
  };

  return getEntityByName;
}
