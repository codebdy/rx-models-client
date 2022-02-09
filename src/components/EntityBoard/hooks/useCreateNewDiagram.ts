import { useSetRecoilState } from "recoil";
import { createId } from "util/creat-id";
import { diagramsState } from "../recoil/atoms";
import intl from "react-intl-universal";
import { useGetDiagramByName } from "./useGetDiagramByName";
import { useCallback } from "react";

export function useCreateNewDiagram() {
  const setDiagrams = useSetRecoilState(diagramsState);
  const getDiagramByName = useGetDiagramByName();

  const getNewDiagramName = useCallback(() => {
    const prefix = intl.get("add-diagram");
    let index = 1;
    while (getDiagramByName(prefix + index)) {
      index++;
    }

    return prefix + index;
  }, [getDiagramByName]);

  const createNewDiagram = useCallback(() => {
    const newDiagram = {
      uuid: createId(),
      name: getNewDiagramName(),
      nodes: [],
      edges: [],
    };
    setDiagrams((entites) => [...entites, newDiagram]);
    return newDiagram;
  }, [getNewDiagramName, setDiagrams]);

  return createNewDiagram;
}
