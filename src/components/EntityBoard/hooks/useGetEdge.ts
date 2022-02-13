import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { x6EdgesState } from "../recoil/atoms";

export function useGetEdge() {
  const edages = useRecoilValue(x6EdgesState);
  const getEdge = useCallback(
    (id: string, diagramUuid: string) => {
      return edages.find(
        (edage) => edage.id === id && edage.diagramUuid === diagramUuid
      );
    },
    [edages]
  );

  return getEdge;
}
