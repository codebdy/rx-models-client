import { alpha, Theme } from "@mui/material";
import { getGraphSize } from "./getGraphSize";

export const getGraphConfig = (theme:Theme)=>{
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
          color: alpha(theme.palette.divider, 0.2), // 主网格线颜色
          thickness: 1,     // 主网格线宽度
        },
        { 
          color: alpha(theme.palette.divider, 0.1), // 次网格线颜色
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
      width:140,
      height:110
    }
  }
}