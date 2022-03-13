import { ClientError, GraphQLError } from "graphql-request/dist/types";
import { useCallback, useEffect, useState } from "react";
import { IObject } from "./IObject";
import { createGraphQLClient } from "./createGraphQLClient";

export interface IQueryOpions {}
export type MutateFn<T> = (data?: T) => void;

export interface QueryOneResult<T> {
  [key: string]: T | undefined;
}

export function useQueryOne<T extends IObject>(
  gql: string
): {
  data?: QueryOneResult<T>;
  mutate: MutateFn<T>;
  loading?: boolean;
  revalidating?: boolean;
  error?: GraphQLError;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GraphQLError>();
  const [data, setData] = useState<QueryOneResult<T>>();
  const excute = useCallback(() => {
    const graphQLClient = createGraphQLClient();

    setLoading(true);
    setError(undefined);
    graphQLClient
      .request(gql)
      .then((data) => {
        setLoading(false);
        if (data) {
          setData(data);
        }
      })
      .catch((err: ClientError) => {
        const error: GraphQLError | undefined = err.response?.errors
          ? err.response.errors[0]
          : err;
        setLoading(false);
        setError(error);
        console.error(err);
      });
  }, [gql]);

  useEffect(() => {
    excute();
  }, [excute]);

  const mutate = useCallback((data?: T) => {
    console.log("执行Mutate");
  }, []);

  return { data, loading, error, mutate };
}
