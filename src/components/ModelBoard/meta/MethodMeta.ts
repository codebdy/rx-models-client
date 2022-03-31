import { ValueType } from "./ValueType";

export interface ArgMeta {
  uuid: string;
  name: string;
  type: ValueType;
  typeUuid?: string;
  /**
   * 渲染图形元素用的label，其他地方毫无用处
   */
  typeLabel: string;
}

export enum MethodType {
  Script = "Script",
  CloudFunction = "Script",
  MicroService = "MicroService"
}

export interface MethodMeta {
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

  args: ArgMeta[];

  /**
   * 渲染图形元素用的label，其他地方毫无用处
   */
  typeLabel: string;

  methodType: MethodType;
  typeJson?: any;
}
