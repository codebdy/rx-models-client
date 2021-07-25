import { AxiosRequestConfig } from "axios";
import { API_MAGIC_UPDATE } from "swr-rxmodel/api";
import { DataError } from "./data-error";
import useLayzyAxios from "./use-layzy-axios";

export default function useLayzyMagicUpdate<T>(
    options?:{
      onCompleted?:(data:T)=>void,
      onError?:(error:any)=>void,
    }      
  )
  :[(config?:AxiosRequestConfig)=>void, {loading?:boolean, data?:T, error?:DataError}] 
{
  const rtValue = useLayzyAxios(API_MAGIC_UPDATE, options);
  return rtValue;
}