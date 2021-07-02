export enum RelationType {
  Association = 'association',
  Aggregation = 'aggregation',
  Combination = 'combination',
}

export enum ConstraintType {
  ONE_TO_ONE = 'one-to-one',
  ONE_TO_MANY = 'one-to-one',
  MANY_TO_MANY = 'many-to-many',
}

export interface RelationMeta {
  id: string;
  relationType: RelationType;
  constraintType: ConstraintType;
  sourceId: string;
  targetId: string;
  nameOnSource: string;
  nameOnTarget: string;
}