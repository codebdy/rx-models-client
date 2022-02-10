import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { RelationMeta } from "../meta/relation-meta";
import { X6EdgeMeta } from "../meta/X6EdgeMeta";
import { relationsState, x6EdgesState } from "../recoil/atoms";
import { useDiagramNodes } from "./useDiagramNodes";

export type EdgeConfig = X6EdgeMeta & RelationMeta;

export function useDiagramEdges(diagramUuid:string){
  const edges = useRecoilValue(x6EdgesState);
  const relations = useRecoilValue(relationsState);
  const existsNodes = useDiagramNodes(diagramUuid);
   const rtEdges: EdgeConfig[] = [];
  // const nodes = this.getExistsNodes();

  // this.rootStore.getRelations()?.forEach(relation=>{
  //   const source = nodes.find(node=>node.id === relation.sourceId);
  //   const target = nodes.find(node=>node.id === relation.targetId);
  //   if(source && target){
  //     const edge = this.edges.find(edge=>edge.id === relation.uuid);
  //     const relationMeta = relation.toMeta();
  //     if(edge){
  //       edges.push({
  //         ...edge, 
  //         ...relationMeta
  //       });
  //     }else{
  //       const newEdge = {id:relation.uuid};
  //       edges.push({
  //         ...newEdge, 
  //         ...relationMeta
  //       })
  //     }
  //   }
  // })
  const diagramEdges = useMemo(()=>{
    return edges.filter(edge=>edge.diagramUuid === diagramUuid)
  }, [diagramUuid, edges])

  return rtEdges;
}