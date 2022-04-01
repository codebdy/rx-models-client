import { Type } from "./Type";

export interface ArgMeta {
  uuid: string;
  name: string;
  type: Type;
  typeUuid?: string;
  /**
   * 渲染图形元素用的label，其他地方毫无用处
   */
  typeLabel: string;
}

export enum MethodImplementType {
  Script = "script",
  CloudFunction = "cloudFunction",
  MicroService = "microService"
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
  type: Type;

  /**
   * 类型uuid
   */
  typeUuid?: string;

  args: ArgMeta[];

  /**
   * 渲染图形元素用的label，其他地方毫无用处
   */
  typeLabel: string;

  implementType: MethodImplementType;
  methodImplements?: string;
}
