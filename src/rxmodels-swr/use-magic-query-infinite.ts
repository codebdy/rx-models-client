import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import  { useSWRInfinite } from "swr";
import { fetcher } from "./fetcher";
import { swrModelConfig } from "./swr-model-config";

export function useMagicQueryInfinite(getKey:(pageIndex: any, previousPageData: any)=>string|null, option?:any){
  const history = useHistory();
  const rtValue = useSWRInfinite(getKey, fetcher, {errorRetryCount:0, ...option});
  useEffect(()=>{
    if(rtValue?.error?.status === 401){
      history?.push(swrModelConfig.loginUrl);
    }
  },[rtValue.error, history, rtValue])
  const rtError = rtValue.error ? {message:rtValue.error?.message?.error} : undefined;
  return {...rtValue, error:rtError};
}