import React, { memo, useEffect, useMemo, useState } from "react";
import { Box, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { EntityTree } from "./EntityTree";
import { GraphCanvas } from "./GraphCanvas";
import classNames from "classnames";
import { Toolbox } from "./Toolbox";
import { PropertyBox } from "./PropertyBox";
import { EntityToolbar } from "./EntityToolbar";
import Loading from "components/common/loading";
import EmpertyCanvas from "./EmpertyCanvas";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  diagramsState,
  entitiesState,
  metaState,
  publishedIdState,
  relationsState,
  selectedDiagramState,
  x6EdgesState,
  x6NodesState,
} from "./recoil/atoms";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import { useQueryOne } from "do-ents/useQueryOne";
import { EntityNameMeta, Meta } from "./meta/Meta";
import { useShowServerError } from "recoil/hooks/useShowServerError";
import { gql } from "graphql-request";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      width: "100%",
      flex: 1,
      display: "flex",
      height: "0",
    },
    canvasShell: {
      flex: 1,
      display: "flex",
    },
    canvas: {
      flex: 1,
      display: "flex",
      flexFlow: "column",
      overflow: "auto",
    },
  })
);

export const ModelsBoard = memo(() => {
  const classes = useStyles();
  const [graph, setGraph] = useState<Graph>();
  const setMeta = useSetRecoilState(metaState);
  const setEntities = useSetRecoilState(entitiesState);
  const setRelations = useSetRecoilState(relationsState);
  const setDiagrams = useSetRecoilState(diagramsState);
  const setX6Nodes = useSetRecoilState(x6NodesState);
  const setX6Edges = useSetRecoilState(x6EdgesState);
  const setPublishedId = useSetRecoilState(publishedIdState);
  const selectedDiagram = useRecoilValue(selectedDiagramState);
  const queryName = useMemo(() => "one" + EntityNameMeta, []);
  const queryGql = useMemo(() => {
    return gql`
    query ${queryName} {
      ${queryName}{
        id
        content
        status
      }
    }
  `;
  }, [queryName]);

  const queryPubishedGql = useMemo(() => {
    return gql`
    query ${queryName} {
      ${queryName}(_where:{
        status:{
          _eq:published
        }
      }){
        id
      }
    }
  `;
  }, [queryName]);

  const {
    data: publishedData,
    error: publishedError,
    loading: publishedLoading,
  } = useQueryOne<Meta>(queryPubishedGql);
  const { data, error, loading } = useQueryOne<Meta>(queryGql);
  useShowServerError(error || publishedError);

  useEffect(() => {
    const meta = publishedData ? publishedData[queryName] : undefined;
    setPublishedId(meta?.id || undefined);
  }, [publishedData, queryName, setPublishedId]);

  useEffect(() => {
    if (data) {
      const meta = data[queryName];
      setMeta(meta);
      setEntities(meta?.content?.entities || []);
      setRelations(meta?.content?.relations || []);
      setDiagrams(meta?.content?.diagrams || []);
      setX6Nodes(meta?.content?.x6Nodes || []);
      setX6Edges(meta?.content?.x6Edges || []);
    }
  }, [
    data,
    queryName,
    setDiagrams,
    setEntities,
    setMeta,
    setRelations,
    setX6Edges,
    setX6Nodes,
  ]);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexFlow: "row",
        height: "0",
      }}
    >
      {loading || publishedLoading ? (
        <Loading />
      ) : (
        <>
          <EntityTree graph={graph}></EntityTree>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexFlow: "column",
            }}
          >
            <EntityToolbar />
            <div className={classNames(classes.content)}>
              {selectedDiagram ? (
                <>
                  <Toolbox graph={graph}></Toolbox>
                  <div
                    className={classNames(
                      classes.canvasShell,
                      "dragit-scrollbar"
                    )}
                  >
                    <div className={classes.canvas} id="container">
                      <GraphCanvas
                        graph={graph}
                        onSetGraph={setGraph}
                      ></GraphCanvas>
                    </div>
                  </div>
                </>
              ) : (
                <EmpertyCanvas></EmpertyCanvas>
              )}
              <PropertyBox></PropertyBox>
            </div>
          </Box>
        </>
      )}
    </Box>
  );
});
