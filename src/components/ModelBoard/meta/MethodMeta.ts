import { ValueType } from "./ValueType";

export interface MethodMeta{
    /**
   * 唯一标识
   */
     uuid: string;

     /**
      * 字段名
      */
     name: string;
   
     /**
      * 字段类型
      */
     type: ValueType;

     /**
      * 类型uuid
      */
     typeUuid?: string;
}