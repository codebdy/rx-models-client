import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useSWR, { SWRResponse } from "swr";
import { LOGIN_URL } from "util/consts";
import { fetcher } from "./fetcher";

export function useSWRQuery<T>(api?:AxiosRequestConfig, options?:any):SWRResponse<T, any>&{loading?:boolean}{
  const history = useHistory();
  const {onError, ...otherOptions} = options||{};

  const rtValue = useSWR<T>(api?.url||null, fetcher, {
      errorRetryCount:0, 
      revalidateOnFocus: false,
      ...(otherOptions||{})
    }
  );

  useEffect(()=>{
    if(rtValue?.error && onError){
      onError(rtValue?.error);
    }
    if(rtValue?.error?.status === 401){
      history?.push(LOGIN_URL);
    }
  },[rtValue.error, history, rtValue, onError])
  const rtError = rtValue.error ? {message:rtValue.error?.message} : undefined;
  return {...rtValue, loading: !rtValue.data && !rtValue.error && !!api?.url, error:rtError};
}