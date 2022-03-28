import React, { memo, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { EntityTree } from "./EntityTree";
import { GraphCanvas } from "./GraphCanvas";
import { Toolbox } from "./Toolbox";
import { PropertyBox } from "./PropertyBox";
import { ModelToolbar } from "./ModelToolbar";
import Loading from "components/common/loading";
import EmpertyCanvas from "./EmpertyCanvas";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  diagramsState,
  classesState,
  metaState,
  minMapState,
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
import { useChildrenScrollStyles } from "theme/useChildrenScrollStyles";

export const ModelsBoard = memo(() => {
  const [graph, setGraph] = useState<Graph>();
  const serviceId = useServiceId();
  const setMeta = useSetRecoilState(metaState(serviceId));
  const setEntities = useSetRecoilState(classesState(serviceId));
  const setRelations = useSetRecoilState(relationsState(serviceId));
  const setDiagrams = useSetRecoilState(diagramsState(serviceId));
  const setX6Nodes = useSetRecoilState(x6NodesState(serviceId));
  const setX6Edges = useSetRecoilState(x6EdgesState(serviceId));
  const setPublishedId = useSetRecoilState(publishedIdState(serviceId));
  const selectedDiagram = useRecoilValue(selectedDiagramState(serviceId));
  const minMap = useRecoilValue(minMapState(serviceId));
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
  const scrollStyles = useChildrenScrollStyles();
  useEffect(() => {
    if (data) {
      const meta = data[queryName];
      setMeta(meta);
      setEntities(meta?.content?.classes || []);
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
            <ModelToolbar />
            <Box sx={{ width: "100%", flex: 1, display: "flex", height: "0" }}>
              {selectedDiagram ? (
                <>
                  <Toolbox graph={graph}></Toolbox>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      ...scrollStyles,
                    }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexFlow: "column",
                        overflow: "auto",
                        position: "relative",
                        "& .x6-widget-minimap": {
                          backgroundColor: (theme) =>
                            theme.palette.background.paper,
                          "& .x6-graph": {
                            boxShadow: (theme) => theme.shadows[0],
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
                          bottom: 3,
                          left: 3,
                          width: 140,
                          height: 110,
                          borderRadius: "5px",
                          overflow: "hidden",
                          display: minMap ? "block" : "none",
                          border: (theme) =>
                            `solid 2px ${theme.palette.divider}`,
                          boxShadow: 5,
                        }}
                        id="mini-map"
                      ></Box>
                    </Box>
                  </Box>
                </>
              ) : (
                <EmpertyCanvas></EmpertyCanvas>
              )}
              <PropertyBox></PropertyBox>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
});
