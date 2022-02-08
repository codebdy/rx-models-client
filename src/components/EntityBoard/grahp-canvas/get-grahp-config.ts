import { getGraphSize } from "./get-grahp-size";

export const getGraphConfig = ()=>{
  const containerDiv = document.getElementById('container')||undefined;
  containerDiv?.getBoundingClientRect()
  const graphSize = getGraphSize();
  return {
    container: containerDiv,
    interacting: true,
    selecting: true,
    snapline: true,
    resizing: {
      enabled: true,
      minWidth: 160,
      minHeight: 50,
    },
    //autoResize:true,
    width: graphSize.width,
    height: graphSize.height,
    grid: {
      size: 10,      // 网格大小 10px
      visible: true, // 渲染网格背景
      type: 'doubleMesh',
      args: [
        { 
          color: '#eee', // 主网格线颜色
          thickness: 1,     // 主网格线宽度
        },
        { 
          color: '#ddd', // 次网格线颜色
          thickness: 1,     // 次网格线宽度
          factor: 4,        // 主次网格线间隔
        },
      ],
    },
    scroller: {
      enabled: true,
      pannable: true,
      pageVisible: false,
      pageBreak: false,
    },
    mousewheel: {
      enabled: true,
      modifiers: ['ctrl', 'meta'],
    },
    minimap: {
      enabled: true,
      container: document.getElementById('mini-map')||undefined,
      width:280,
      height:220
    }
  }
}