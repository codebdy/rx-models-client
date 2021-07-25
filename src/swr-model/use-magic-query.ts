import  { SWRResponse } from "swr";
import { DataError } from "./data-error";
import { MagicQueryBuilder } from "./magic-query-builder";
import { QueryResult } from "./query-result";
import { useSWRQuery } from "./use-swr-query";

export function useMagicQuery<T>(queryMeta?:MagicQueryBuilder<T>, options?:any):SWRResponse<QueryResult<T>, DataError>&{loading?:boolean}{

  const rt = useSWRQuery<QueryResult<T>>(queryMeta?.toAxioConfig(), options);

  return rt;
}