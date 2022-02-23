import { ClientError, gql } from "graphql-request";
import { GraphQLError } from "graphql-request/dist/types";
import { useCallback, useState } from "react";
import { createGraphQLClient } from "./createGraphQLClient";
import { IInstance } from "./IInstance";

export interface IPostOptions<T extends IInstance> {
  onCompleted?: (data: T) => void;
  onError?: (error: GraphQLError) => void;
  noRefresh?: boolean;
}

export function usePostOne<T extends IInstance>(options?: IPostOptions<T>) {
  //const { noRefresh, ...axioOptions } = useMemo(() => options || {}, [options]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GraphQLError | undefined>();
  //const postedDataRef = useRef<any>();

  const post = useCallback(
    (data: T) => {
      const {__type, ...inputData} = data;
      const graphQLClient = createGraphQLClient();
      const postName = "post" + data.__type;
      const postMutation = gql`
        mutation ${postName} ($postInput: MetaPostInput!) {
          ${postName}(object: $postInput)
        }
      `;

      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(postMutation, inputData)
        .then((data) => {
          setLoading(false);
          options?.onCompleted && options?.onCompleted(data.login);
        })
        .catch((err: ClientError) => {
          const error: GraphQLError | undefined = err.response.errors
            ? err.response.errors[0]
            : undefined;
          setLoading(false);
          setError(error);
          console.error(err);
          error && options?.onError && options?.onError(error);
        });
    },
    [options]
  );

  return [post, { loading, error }];;
}
