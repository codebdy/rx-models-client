import { Box } from "@mui/material";
import GraphiQL from "graphiql";
import "graphiql/graphiql.css";
import { SERVER_URL, SERVER_SUBSCRIPTION_URL } from "util/consts";
import { createClient } from "graphql-ws";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { useMemo } from "react";

export default function GraphiQLBoard() {
  const fetcher = useMemo(() => {
    const fetcher = createGraphiQLFetcher({
      url: SERVER_URL,
      wsClient: createClient({
        url: SERVER_SUBSCRIPTION_URL,
        keepAlive: 2000,
      }),
    });
    return fetcher;
  }, []);
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      {fetcher && (
        <GraphiQL
          headerEditorEnabled
          fetcher={fetcher}
          // query=""
        />
      )}
    </Box>
  );
}
