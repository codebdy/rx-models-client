import { gql, GraphQLClient } from "graphql-request";
import { useState } from "react";
import { GRAPHQL_SERVER } from "util/consts";

const loginMutation = gql`
  mutation login($loginName: String!, $password: String!) {
    login(loginName: $loginName, password: $password)
  }
`;

export interface LoginOptions {
  onCompleted?: (access_token: string) => void;
  onError?: (error: string) => void;
}

export function useLogin(
  options?: LoginOptions
): [
  (loginName: string, password: string) => void,
  { token?: string; loading?: boolean; error?: string }
] {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const graphQLClient = new GraphQLClient(GRAPHQL_SERVER, {
    mode: "cors",
  });

  const login = (loginName: string, password: string) => {
    setLoading(true);
    setError(undefined);
    graphQLClient
      .request(loginMutation, { loginName, password })
      .then((data) => {
        setLoading(false);
        setToken(data.login);
        options?.onCompleted && options?.onCompleted(data.login);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        console.error(err);
        options?.onError && options?.onError(err);
      });
  };

  return [login, { token, loading, error }];
}
