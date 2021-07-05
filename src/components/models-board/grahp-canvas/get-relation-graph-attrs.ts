import { RelationType } from "../meta/relation-meta";

export function getRelationGraphAttrs(relationType: RelationType){
  if(relationType === RelationType.ONE_TO_ONE){
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

  if(relationType === RelationType.ONE_TO_MANY){
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
            M 12,0
            L 0,6
            M 12,0
            L 0,-6
          `,
       },
      }
    }
  }

  if(relationType === RelationType.MANY_TO_MANY){
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
            M 12,0
            L 0,6
            M 12,0
            L 0,-6
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
            M 12,0
            L 0,6
            M 12,0
            L 0,-6
          `,
       },
      }
    }
  }

}