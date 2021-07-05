import { Edge } from "@antv/x6"

export const InheritEdge = Edge.define({
  constructorName: 'class-inherit',
  attrs:{
    line: {
      stroke: '#000',
      strokeWidth: 1,
      targetMarker: {
        tagName: 'path',
        fill: '#FFF',  
        stroke: '#000', 
        strokeWidth: 1,
        d: 'M 18 -9 0 0 18 9 Z',
      },
    }
  },
})
