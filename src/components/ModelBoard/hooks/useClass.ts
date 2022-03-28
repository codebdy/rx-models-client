import { useRecoilValue } from "recoil";
import { classesState } from "../recoil/atoms";

export function useClass(uuid: string, serviceId: number) {
  const entites = useRecoilValue(classesState(serviceId));

  return entites.find((cls) => cls.uuid === uuid);
}
