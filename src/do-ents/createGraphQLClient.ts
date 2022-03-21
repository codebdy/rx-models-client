import { GraphQLClient } from "graphql-request";
import { SERVER_URL } from "util/consts";

export function createGraphQLClient() {
  return new GraphQLClient(SERVER_URL, {
    mode: "cors",
  });
}
