import { RelationType } from "../meta/relation-meta";

export function getRelationGraphAttrs(relation:RelationType){
  if(relation === RelationType.ONE_TO_ONE){
    return  {
      line: {
        stroke: '#000',
        strokeWidth: 1,
        sourceMarker: {
          tagName: 'path',
          fill: '#FFF',  
          stroke: '#000', 
          strokeWidth: 1,
          d:`
            M 12, 0
            a 4 4 0 1 1 0 1 z
          `,
        },
        targetMarker: {
          tagName: 'path',
          fill: '#FFF',  
          stroke: '#000', 
          strokeWidth: 1,
          d:`
            M 12, 0
            a 4 4 0 1 1 0 1 z
          `,
       },
      }
    }
  }
}