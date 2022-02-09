import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { diagramsState } from "../recoil/atoms";

export function useGetDiagramByName() {
  const diagrams = useRecoilValue(diagramsState);

  const getDiagramByName = useCallback((name: string) => {
    return diagrams.find((diagram) => diagram.name === name);
  }, [diagrams]);

  return getDiagramByName;
}
