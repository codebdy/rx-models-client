export enum AbilityType{
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete'
}

export interface RxAbility {
  id?: number;
  entityUuid: string;
  columnUuid?: string;
  abilityType: AbilityType;
  can: boolean;
  expression: string;
}