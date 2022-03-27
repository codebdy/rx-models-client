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
import { useServiceId } from "./hooks/useServiceId";

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
  })
);

export const ModelsBoard = memo(() => {
  const classes = useStyles();
  const [graph, setGraph] = useState<Graph>();
  const serviceId = useServiceId();
  const setMeta = useSetRecoilState(metaState(serviceId));
  const setEntities = useSetRecoilState(entitiesState(serviceId));
  const setRelations = useSetRecoilState(relationsState(serviceId));
  const setDiagrams = useSetRecoilState(diagramsState(serviceId));
  const setX6Nodes = useSetRecoilState(x6NodesState(serviceId));
  const setX6Edges = useSetRecoilState(x6EdgesState(serviceId));
  const setPublishedId = useSetRecoilState(publishedIdState(serviceId));
  const selectedDiagram = useRecoilValue(selectedDiagramState(serviceId));
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
      ${queryName}(where:{
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
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexFlow: "column",
                        overflow: "auto",
                        "& .x6-widget-minimap": {
                          backgroundColor: "transparent",
                          "& .x6-graph": {
                            boxShadow: (theme) => theme.shadows[5],
                          },
                        },
                      }}
                    >
                      <GraphCanvas
                        graph={graph}
                        onSetGraph={setGraph}
                      ></GraphCanvas>
                      <Box
                        sx={{
                          position: "absolute",
                          zIndex: 1,
                          bottom: 0,
                          right: 0,
                          width: 140,
                          height: 110,
                          border: (theme) =>
                            `solid 1px ${theme.palette.divider}`,
                        }}
                        id="mini-map"
                      ></Box>
                    </Box>
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
