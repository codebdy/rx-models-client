import { useRecoilValue } from "recoil";
import { entitesState } from "../recoil/atoms";

export function useGetEntityByName() {
  const entites = useRecoilValue(entitesState);

  const getEntityByName = (name: string) => {
    return entites.find((ent) => ent.name === name);
  };

  return getEntityByName;
}
