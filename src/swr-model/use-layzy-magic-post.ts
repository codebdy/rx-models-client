import { API_MAGIC_POST } from "apis/magic";
import { AxiosRequestConfig } from "axios";
import { DataError } from "./data-error";
import useLayzyAxios from "./use-layzy-axios";

export default function useLayzyMagicPost<T>(
    options?:{
      onCompleted?:(data:T)=>void,
      onError?:(error:any)=>void,
    }      
  )
  :[(config?:AxiosRequestConfig)=>void, {loading?:boolean, data?:T, error?:DataError}] 
{
  const rtValue = useLayzyAxios(API_MAGIC_POST, options);
  return rtValue;
}