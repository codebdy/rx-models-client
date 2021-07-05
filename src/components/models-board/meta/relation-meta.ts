export enum RelationType {
  ONE_TO_ONE = 'one-to-one',
  ONE_TO_MANY = 'one-to-many',
  MANY_TO_MANY = 'many-to-many',
}

export interface RelationMeta {
  id: string;
  relationType: RelationType;
  sourceId: string;
  targetId: string;
  roleOnSource: string;
  roleOnTarget: string;
}