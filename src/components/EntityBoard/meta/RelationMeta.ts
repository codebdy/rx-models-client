
/**
 * 关系类型
 */
export enum RelationType {
  IMPLEMENTS = 'implements',
  ONE_TO_ONE = 'oneToOne',
  ONE_TO_MANY = 'oneToMany',
  MANY_TO_ONE = 'manyToOne',
  MANY_TO_MANY = 'manyToMany',
}

export enum CascadeType {
  ON_SOURCE = 'onSource',
  ON_TARGET = 'onTarget'
}

/**
 * 关系元数据
 */
export interface RelationMeta {
  /**
  * 唯一标识
  */
  uuid: string;

  /**
  * 关系类型
  */  
  relationType: RelationType;

  /**
  * 关系的源实体标识
  */  
  sourceId: string;

  /**
  * 关系目标源实体标识
  */  
  targetId: string;

  /**
  * 源实体上的关系属性
  */  
  roleOnSource?: string;

  /**
  * 目标实体上的关系属性
  */    
  roleOnTarget?: string;

  descriptionOnSource?: string;

  descriptionOnTarget?: string;
  
  /**
   * 拥有关系的实体ID，对应TypeORM的JoinTable或JoinColumn
   */
  ownerId?: string;

  cascadeType?: CascadeType;
}