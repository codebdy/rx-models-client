import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { x6NodesState } from "../recoil/atoms";

export function useGetNode() {
  const nodes = useRecoilValue(x6NodesState);

  const getNode = useCallback(
    (uuid: string) => {
      return nodes.find((node) => node.id === uuid);
    },
    [nodes]
  );

  return getNode;
}
