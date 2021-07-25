import { AxiosRequestConfig } from "axios";
import { API_MAGIC_DELETE } from "swr-model/apis/magic";
import { DataError } from "./data-error";
import useLayzyAxios from "./use-layzy-axios";

export default function useLayzyMagicDelete<T>(
    options?:{
      onCompleted?:(data:T)=>void,
      onError?:(error:any)=>void,
    }      
  )
  :[(config?:AxiosRequestConfig)=>void, {loading?:boolean, data?:T, error?:DataError}] 
{
  const rtValue = useLayzyAxios(API_MAGIC_DELETE, options);
  return rtValue;
}