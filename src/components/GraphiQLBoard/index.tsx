import { Box } from "@mui/material";
import GraphiQL from "graphiql";
import "graphiql/graphiql.css";

export default function GraphiQLBoard() {
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <GraphiQL
        headerEditorEnabled
        fetcher={async (graphQLParams, options) => {
          const data = await fetch(
            "https://swapi-graphql.netlify.app/.netlify/functions/index",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...options?.headers,
              },
              body: JSON.stringify(graphQLParams),
              credentials: "same-origin",
            }
          );
          return data.json().catch(() => data.text());
        }}
      />
    </Box>
  );
}
