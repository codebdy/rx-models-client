import { AttributeMeta } from "./AttributeMeta";
import { MethodMeta } from "./MethodMeta";

/**
 * 实体类型枚举
 * 枚举实体类似语法糖，不映射数据库，
 * 枚举类型的字段映射到数据库是string类型
 */
export enum StereoType {
  Enum = "Enum",
  //Interface = "Interface",
  Abstract = "Abstract",
  ValueObject = "ValueObject",
  Entity = "Entity",
  //GQLInterface = "GQLInterface",
  //Association = "Association",
  Service = "Service",//"DDD"中的 service 类
}

/**
 * 实体元数据
 */
export interface ClassMeta {
  /**
   * 唯一标识
   */
  uuid: string;

  innerId: number;

  name: string;

  stereoType: StereoType;

  attributes: AttributeMeta[];
  methods: MethodMeta[];

  root?: boolean;

  //暂时不用改属性，把所有的abstract class 打散，变为多继承
  // gqlInterface?: boolean;

  description?: string;
}
