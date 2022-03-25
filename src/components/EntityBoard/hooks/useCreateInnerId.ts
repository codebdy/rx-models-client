import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { nextIdState } from "../recoil/atoms";

export function useCreateInnerId(serviceId: number) {
  const [nextId, setNextId] = useRecoilState(nextIdState(serviceId))
  const createInnerId = useCallback(() => {
    const id = nextId;
    setNextId((id)=>id++)
    return id;
  }, [nextId, setNextId]);

  return createInnerId;
}
