import { ServerError } from "do-ents/ServerError";
import { useEffect } from "react";
import intl from "react-intl-universal";
import { useSetRecoilState } from "recoil";
import { appErrorState } from "recoil/atoms";

export function useShowServerError(error?: ServerError) {
  const setError = useSetRecoilState(appErrorState);
  useEffect(() => {
    if (error) {
      setError({ message: intl.get("server-error"), details: error?.message });
    }
  }, [error, setError]);
}
