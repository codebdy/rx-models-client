import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { x6EdgesState } from "../recoil/atoms";

export function useGetEdge() {
  const edges = useRecoilValue(x6EdgesState);
  const getEdge = useCallback(
    (id: string, diagramUuid: string) => {
      return edges.find(
        (edage) => edage.id === id && edage.diagramUuid === diagramUuid
      );
    },
    [edges]
  );

  return getEdge;
}
