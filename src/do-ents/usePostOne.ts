import { ClientError, gql } from "graphql-request";
import { useCallback, useState } from "react";
import { createGraphQLClient } from "./createGraphQLClient";
import { IObject } from "./IObject";
import { ServerError } from "./ServerError";

export interface IPostOptions<T extends IObject> {
  onCompleted?: (data: T) => void;
  onError?: (error: ServerError) => void;
  noRefresh?: boolean;
}

export function usePostOne<T extends IObject>(
  options?: IPostOptions<T>
): [
  (data: T) => void,
  { loading: boolean; error: ServerError | undefined }
] {
  //const { noRefresh, ...axioOptions } = useMemo(() => options || {}, [options]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();
  //const postedDataRef = useRef<any>();

  const post = useCallback(
    (data: T) => {
      const { __type, ...postInput } = data;
      const graphQLClient = createGraphQLClient();
      const postName = "postOne" + data.__type;
      const postMutation = gql`
        mutation ${postName} ($postInput: MetaPostInput!) {
          ${postName}(object: $postInput){
            id
          }
        }
      `;

      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(postMutation, {postInput})
        .then((data) => {
          setLoading(false);
          options?.onCompleted && options?.onCompleted(data[postName]);
        })
        .catch((err: ClientError) => {
          const error: ServerError | undefined = err.response.errors
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

  return [post, { loading, error }];
}
