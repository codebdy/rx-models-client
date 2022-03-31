import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { appErrorState } from "recoil/atoms";

export function useAlertError() {
  const setError = useSetRecoilState(appErrorState);

  const alertError = useCallback((message: string) => {
    setError({ message });
  }, [setError]);

  return alertError;
}
