import { RxAbility } from "./rx-ability";

export interface RxRole{
  id?: number;
  name: string;
  description: string;
  abilities?: RxAbility[]
}