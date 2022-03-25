import { ClientError, GraphQLError } from "graphql-request/dist/types";
import { useCallback, useEffect, useState } from "react";
import { createGraphQLClient } from "./createGraphQLClient";
import { Service } from "components/EntityBoard/meta/Service";

export interface IQueryOpions {}
export type MutateFn<T> = (data?: T) => void;

const gql = `
  query{
    service{
      id
    }
  }
`

export function useService(): {
  service?: Service;
  loading?: boolean;
  error?: GraphQLError;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GraphQLError>();
  const [service, setService] = useState<Service>();
  const excute = useCallback(() => {
    const graphQLClient = createGraphQLClient();

    setLoading(true);
    setError(undefined);
    graphQLClient
      .request(gql)
      .then((data) => {
        setLoading(false);
        if (data) {
          setService(data["service"]);
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
  }, []);

  useEffect(() => {
    excute();
  }, [excute]);

  return { service, loading, error };
}
