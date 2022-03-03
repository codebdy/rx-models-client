import { GraphQLError } from "graphql-request/dist/types";
import { useCallback, useState } from "react";
import { IObject } from "./IObject";
import { Where } from "./Where";

export interface IQueryOpions {}
export type MutateFn<T> = (data?: T) => void;

export function useQueryOne<T extends IObject>(
  where: Where | undefined,
  options?: IQueryOpions
):{
  data?: T;
  mutate: MutateFn<T>;
  loading?: boolean;
  revalidating?: boolean;
  error?: GraphQLError;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GraphQLError>();
  const [data, setData] = useState<T>();

  const mutate = useCallback(
    (data?: T) => {
      console.log("执行Mutate");

    },
    []
  );

  return {data, loading, error, mutate}
}
