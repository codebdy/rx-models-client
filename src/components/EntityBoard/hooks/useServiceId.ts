import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { serviceState } from "../recoil/atoms";

export function useServiceId(){
  const service = useRecoilValue(serviceState);
  const serviceId = useMemo(()=>service?.id||0, [service?.id])
  return serviceId
}