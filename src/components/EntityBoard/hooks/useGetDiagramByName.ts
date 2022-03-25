import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { diagramsState } from "../recoil/atoms";

export function useGetDiagramByName(serviceId: number) {
  const diagrams = useRecoilValue(diagramsState(serviceId));

  const getDiagramByName = useCallback((name: string) => {
    return diagrams.find((diagram) => diagram.name === name);
  }, [diagrams]);

  return getDiagramByName;
}
