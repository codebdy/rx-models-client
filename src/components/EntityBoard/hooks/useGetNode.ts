import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { x6NodesState } from "../recoil/atoms";

export function useGetNode(serviceId: number) {
  const nodes = useRecoilValue(x6NodesState(serviceId));

  const getNode = useCallback(
    (uuid: string, diagramUuid: string) => {
      return nodes.find(
        (node) => node.id === uuid && node.diagramUuid === diagramUuid
      );
    },
    [nodes]
  );

  return getNode;
}
