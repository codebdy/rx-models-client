import { AbilityCondition } from "./ability-condition";

export interface RxEntityAuth {
  id?: number;
  entityUuid: string;
  conditions: AbilityCondition[];
  expand: boolean;
}