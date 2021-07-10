import  { SWRResponse } from "swr";
import { DataError } from "./data-error";
import { MagicQueryBuilder } from "./magic-query-builder";
import { Paginator } from "./paginator";
import { useSWRQuery } from "./use-swr-query";

export function useMagicQuery<T>(queryMeta?:MagicQueryBuilder, options?:any):SWRResponse<{data:T, pagination?:Paginator}, DataError>&{loading?:boolean}{

  const rt = useSWRQuery<{data:T}>(queryMeta?.toAxioConfig(), options);

  return rt;
}