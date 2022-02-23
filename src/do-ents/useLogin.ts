import { ClientError, gql } from "graphql-request";
import { GraphQLError } from "graphql-request/dist/types";
import { useCallback, useState } from "react";
import { createGraphQLClient } from "./createGraphQLClient";

const loginMutation = gql`
  mutation login($loginName: String!, $password: String!) {
    login(loginName: $loginName, password: $password)
  }
`;

export interface LoginOptions {
  onCompleted?: (access_token: string) => void;
  onError?: (error?: GraphQLError) => void;
}

export function useLogin(
  options?: LoginOptions
): [
  (loginName: string, password: string) => void,
  { token?: string; loading?: boolean; error?: GraphQLError }
] {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GraphQLError | undefined>();

  const login = useCallback((loginName: string, password: string) => {
    const graphQLClient = createGraphQLClient();

    setLoading(true);
    setError(undefined);
    graphQLClient
      .request(loginMutation, { loginName, password })
      .then((data) => {
        setLoading(false);
        setToken(data.login);
        options?.onCompleted && options?.onCompleted(data.login);
      })
      .catch((err: ClientError) => {
        const error: GraphQLError | undefined = err.response.errors
          ? err.response.errors[0]
          : undefined;
        setLoading(false);
        setError(error);
        console.error(err);
        options?.onError && options?.onError(error);
      });
  }, [options]);

  return [login, { token, loading, error }];
}
