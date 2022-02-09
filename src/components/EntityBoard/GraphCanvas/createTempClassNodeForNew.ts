import { NODE_INIT_SIZE } from "./nodeInitSize";

export function createTempClassNodeForNew(){
  //const entityMeta = creatNewEntityMeta(this)
  return {
    uuid: 'entityMeta.uuid',
    ...NODE_INIT_SIZE,
    shape: 'react-shape', 
    data:{
      //...entityMeta,
      isTempForNew: true,
    }
  }
}