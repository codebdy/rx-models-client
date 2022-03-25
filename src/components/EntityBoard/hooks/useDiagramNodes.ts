import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { x6NodesState } from "../recoil/atoms";

export function useDiagramNodes(diagramUuid:string, serviceId: number){
  const nodes = useRecoilValue(x6NodesState(serviceId));

  const diagramNodes = useMemo(()=>{
    return nodes.filter(node=>node.diagramUuid === diagramUuid)
  }, [diagramUuid, nodes])

  return diagramNodes;
}