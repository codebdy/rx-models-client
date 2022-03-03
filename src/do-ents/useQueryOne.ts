import { ClientError, GraphQLError } from "graphql-request/dist/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IObject } from "./IObject";
import { Where } from "./Where";
import _ from "lodash";
import { gql } from "graphql-request";
import { createGraphQLClient } from "./createGraphQLClient";

export interface IQueryOpions {}
export type MutateFn<T> = (data?: T) => void;

export function useQueryOne<T extends IObject>(
  entity: string,
  where?: Where,
  options?: IQueryOpions
): {
  data?: T;
  mutate: MutateFn<T>;
  loading?: boolean;
  revalidating?: boolean;
  error?: GraphQLError;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GraphQLError>();
  const [data, setData] = useState<T>();
  const queryName = useMemo(() => "one" + entity, [entity]);
  const queryGql = useMemo(() => {
    return gql`
    query {
      ${queryName}(){
        affectedRows
        returning{
          id
        }
      }
    }
  `;
  }, [queryName]);
  const excute = useCallback(() => {
    const graphQLClient = createGraphQLClient();

    setLoading(true);
    setError(undefined);
    graphQLClient
      .request(queryGql)
      .then((data) => {
        setLoading(false);
        if (data) {
          setData(data[queryName]);
        }
      })
      .catch((err: ClientError) => {
        const error: GraphQLError | undefined = err.response.errors
          ? err.response.errors[0]
          : undefined;
        setLoading(false);
        setError(error);
        console.error(err);
      });
  }, [queryGql, queryName]);

  useEffect(() => {
    excute();
  }, [excute]);

  const mutate = useCallback((data?: T) => {
    console.log("执行Mutate");
  }, []);

  return { data, loading, error, mutate };
}
