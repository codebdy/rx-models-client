import { Paginator } from "./paginator";

export interface QueryResult<T>{
  data:T;
  pagination?:Paginator;
}