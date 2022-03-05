import { Meta } from "components/EntityBoard/meta/Meta";
import { ClientError, gql } from "graphql-request";
import { useCallback, useState } from "react";
import { createGraphQLClient } from "./createGraphQLClient";
import { ServerError } from "./ServerError";
import { IPostOptions } from "./usePostOne";

export function useSyncMeta(
  options?: IPostOptions<Meta>
): [
  (data: Meta) => void,
  { loading: boolean; error: ServerError | undefined }
] {
  //const { noRefresh, ...axioOptions } = useMemo(() => options || {}, [options]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();
  //const postedDataRef = useRef<any>();

  const syncMeta = useCallback(
    (data: Meta) => {
      const { __type, ...postInput } = data;
      const graphQLClient = createGraphQLClient();
      const postMutation = gql`
        mutation syncMeta ($postInput: MetaPostInput!) {
          syncMeta(object: $postInput){
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
          options?.onCompleted && options?.onCompleted(data["syncMeta"]);
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

  return [syncMeta, { loading, error }];
}
