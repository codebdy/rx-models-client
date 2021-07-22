import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppStore } from "store/app-store";
import useSWR, { SWRResponse } from "swr";
import { LOGIN_URL, TOKEN_NAME } from "util/consts";
import { fetcher } from "./fetcher";

export function useSWRQuery<T>(api?:AxiosRequestConfig, options?:any):SWRResponse<T, any>&{loading?:boolean}{
  const history = useHistory();
  const appStore = useAppStore();
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
      appStore.setToken('');
      appStore.setLoggedUser(undefined);
      localStorage.removeItem(TOKEN_NAME);
      history?.push(LOGIN_URL);
    }
  },[rtValue?.error, history, rtValue, onError, appStore])
  const rtError = rtValue.error ? {message:rtValue.error?.message?.error || rtValue.error?.message?.message || rtValue.error?.message, status: rtValue?.error?.status} : undefined;
  return {...rtValue, loading: !rtValue.data && !rtValue.error && !!api?.url, error:rtError};
}