import { AbilityCondition } from "./ability-condition";

export interface EntityAuth {
  id?: number;
  entityUuid: string;
  conditions: AbilityCondition[];
  expand: boolean;
}