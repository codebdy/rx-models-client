import { GraphQLClient } from "graphql-request";
import { GRAPHQL_SERVER } from "util/consts";

export function createGraphQLClient() {
  return new GraphQLClient(GRAPHQL_SERVER, {
    mode: "cors",
  });
}
