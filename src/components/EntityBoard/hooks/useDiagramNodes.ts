import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { x6NodesState } from "../recoil/atoms";

export function useDiagramNodes(diagramUuid:string){
  const nodes = useRecoilValue(x6NodesState);

  const diagramNodes = useMemo(()=>{
    return nodes.filter(node=>node.diagramUuid === diagramUuid)
  }, [diagramUuid, nodes])

  return diagramNodes;
}