import { RelationType } from "../meta/RelationMeta";

export function getRelationGraphAttrs(relationType: RelationType){
  if(relationType === RelationType.IMPLEMENTS){
    return  {
      line: {
        stroke: '#000',
        strokeWidth: 1,
        sourceMarker: {
          tagName: 'path',
          fill: '#FFF',  
          stroke: '#000', 
          strokeWidth: 1,
          d:``,
        },
        targetMarker: {
          tagName: 'path',
          fill: '#FFF',  
          stroke: '#000', 
          strokeWidth: 1,
          d:`
            M 0,0
            L 15,10
            L 15,-10
            L 0,0
          `,
       },
      }
    }

  }
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
            M 5, 0
            a 4 4 0 1 1 0 1 z
          `,
        },
        targetMarker: {
          tagName: 'path',
          fill: '#FFF',  
          stroke: '#000', 
          strokeWidth: 1,
          d:`
            M 5, 0
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
            M 5, 0
            a 4 4 0 1 1 0 1 z
          `,
        },
        targetMarker: {
          tagName: 'path',
          fill: '#FFF',  
          stroke: '#000', 
          strokeWidth: 1,
          d:`
            M 16, 0
            a 4 4 0 1 1 0 1 z
            M 16,0
            L 0,6
            M 16,0
            L 0,-6
          `,
       },
      }
    }
  }

  if(relationType === RelationType.MANY_TO_ONE){
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
            M 16, 0
            a 4 4 0 1 1 0 1 z
            M 16,0
            L 0,6
            M 16,0
            L 0,-6
          `,
        },
        targetMarker: {
          tagName: 'path',
          fill: '#FFF',  
          stroke: '#000', 
          strokeWidth: 1,
          d:`
            M 5, 0
            a 4 4 0 1 1 0 1 z
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
            M 16, 0
            a 4 4 0 1 1 0 1 z
            M 16,0
            L 0,6
            M 16,0
            L 0,-6
          `,
        },
        targetMarker: {
          tagName: 'path',
          fill: '#FFF',  
          stroke: '#000', 
          strokeWidth: 1,
          d:`
            M 16, 0
            a 4 4 0 1 1 0 1 z
            M 16,0
            L 0,6
            M 16,0
            L 0,-6
          `,
       },
      }
    }
  }

}