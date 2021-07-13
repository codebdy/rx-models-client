export interface RxAbility {
  id?: number;
  entityUuid: string;
  columnUuid?: string;
  conditionUuid?: string;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}