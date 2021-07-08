import { DataError } from "data/data-error";
import { useEffect } from "react";
import intl from 'react-intl-universal';
import { useAppStore } from "store/app-store";

export function useShowServerError(error?:DataError){
  const appStore = useAppStore() 
  useEffect(()=>{
    if(error){
      appStore.infoError(intl.get('server-error'), error?.message)
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[error])
}