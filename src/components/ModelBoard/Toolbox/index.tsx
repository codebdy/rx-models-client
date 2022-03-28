import React, { memo, useCallback } from "react";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import classNames from "classnames";
import intl from "react-intl-universal";
import { Accordion } from "./Accordion";
import { AccordionSummary } from "./AccordionSummary";
import { AccordionDetails } from "./AccordionDetails";
import { Addon, Graph } from "@antv/x6";
import { useEffect } from "react";
import { EntityView } from "../GraphCanvas/EntityView";
import {
  svgInherit,
  svgLinkLine,
  svgOneWayAggregation,
  svgOneWayAssociation,
  svgOneWayCombination,
  svgTwoWayAggregation,
  svgTwoWayAssociation,
  svgTwoWayCombination,
} from "./constSvg";
import { RelationType } from "../meta/RelationMeta";
import { pressedLineTypeState } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import { useCreateTempClassNodeForNew } from "../hooks/useCreateTempClassNodeForNew";
import { useScrollbarStyles } from "theme/useScrollbarStyles";
import { Box } from "@mui/material";
import { useServiceId } from "../hooks/useServiceId";
import { ClassRect } from "./ClassRect";
const { Dnd } = Addon;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolItem: {
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      marginTop: theme.spacing(2),
      color: theme.palette.text.primary,
    },
    firstItem: {
      marginTop: theme.spacing(0),
    },
    relationItem: {
      cursor: "pointer",
    },
    moveable: {
      cursor: "move",
    },
    clickable: {
      cursor: "pointer",
    },
    selected: {
      color: theme.palette.primary.main,
    },
  })
);

export const Toolbox = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const classes = useStyles();
  const [expandEntites, setExpandEntites] = React.useState(true);
  const [expandTwoWayRelations, setTwoWayExpandRelations] =
    React.useState(false);
  const [expandOneWayRelations, setOneWayExpandRelations] =
    React.useState(false);
  const [expandOthers, setExpandOthers] = React.useState(false);
  const [dnd, setDnd] = React.useState<any>();
  const serviceId = useServiceId();
  const [pressedLineType, setPressedLineType] = useRecoilState(
    pressedLineTypeState(serviceId)
  );
  const scrollStyles = useScrollbarStyles(true);
  const createTempClassNodeForNew = useCreateTempClassNodeForNew(serviceId);

  const handleEneitiesChange = useCallback(
    () => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setExpandEntites((a) => !a);
    },
    []
  );

  const handleTwoWayRelationsChange = useCallback(
    () => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setTwoWayExpandRelations((a) => !a);
    },
    []
  );

  const handleOneWayRelationsChange = useCallback(
    () => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setOneWayExpandRelations((a) => !a);
    },
    []
  );

  const handleOthersChange = useCallback(
    () => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setExpandOthers((a) => !a);
    },
    []
  );

  useEffect(() => {
    const theDnd = graph
      ? new Dnd({
          target: graph,
          scaled: false,
          animation: true,
        })
      : undefined;
    setDnd(theDnd);
  }, [graph]);

  const startDrag = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!graph) {
        return;
      }
      const nodeConfig = createTempClassNodeForNew() as any;
      nodeConfig.component = <EntityView />;
      const node = graph.createNode(nodeConfig);
      dnd?.start(node, e.nativeEvent as any);
    },
    [createTempClassNodeForNew, dnd, graph]
  );

  const doRelationClick = useCallback(
    (lineType: RelationType) => {
      if (lineType === pressedLineType) {
        setPressedLineType(undefined);
      } else {
        setPressedLineType(lineType);
      }
    },
    [pressedLineType, setPressedLineType]
  );

  const handleRelationClick = useCallback(
    (lineType: RelationType) => {
      return () => doRelationClick(lineType);
    },
    [doRelationClick]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
        width: "100px",
        alignItems: "center",
        overflowY: "auto",
        overflowX: "hidden",
        ...scrollStyles,
      }}
    >
      <div>
        <Accordion
          square
          sx={{
            "&.MuiAccordion-root": {
              borderLeft: 0,
              borderTop: 0,
            },
          }}
          expanded={expandEntites}
          onChange={handleEneitiesChange()}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            sx={{
              "&.Mui-expanded": {
                margin: 0,
              },
            }}
          >
            <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>
              {intl.get("class")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={classNames(
                classes.toolItem,
                classes.firstItem,
                classes.moveable
              )}
              data-type="rect"
              onMouseDown={startDrag}
            >
              <ClassRect first={true} />
              {intl.get("class")}
            </div>
            <div
              className={classNames(
                classes.toolItem,
                classes.firstItem,
                classes.moveable
              )}
              data-type="rect"
              onMouseDown={startDrag}
            >
              <ClassRect />
              {intl.get("class")}
            </div>
            <div
              className={classNames(
                classes.toolItem,
                classes.firstItem,
                classes.moveable
              )}
              data-type="rect"
              onMouseDown={startDrag}
            >
              <ClassRect />
              {intl.get("class")}
            </div>
            <div
              className={classNames(
                classes.toolItem,
                classes.firstItem,
                classes.moveable
              )}
              data-type="rect"
              onMouseDown={startDrag}
            >
              <ClassRect />
              {intl.get("class")}
            </div>
            <div
              className={classNames(
                classes.toolItem,
                classes.firstItem,
                classes.moveable
              )}
              data-type="rect"
              onMouseDown={startDrag}
            >
              <ClassRect />
              {intl.get("class")}
            </div>
            <div
              className={classNames(
                classes.toolItem,
                classes.firstItem,
                classes.moveable
              )}
              data-type="rect"
              onMouseDown={startDrag}
            >
              <ClassRect />
              {intl.get("class")}
            </div>
            <div
              className={classNames(classes.toolItem, classes.relationItem, {
                [classes.selected]: pressedLineType === RelationType.INHERIT,
              })}
              onClick={handleRelationClick(RelationType.INHERIT)}
            >
              {svgInherit}
              {intl.get("inherit")}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          sx={{ 
            "&.MuiAccordion-root": { borderLeft: 0 },
            "&.Mui-expanded": {
              margin: 0,
            },
          }}
          expanded={expandTwoWayRelations}
          onChange={handleTwoWayRelationsChange()}
          
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>
              {intl.get("two-way-relation")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={classNames(
                classes.toolItem,
                classes.firstItem,
                classes.relationItem,
                {
                  [classes.selected]:
                    pressedLineType === RelationType.TWO_WAY_ASSOCIATION,
                }
              )}
              onClick={handleRelationClick(RelationType.TWO_WAY_ASSOCIATION)}
            >
              {svgTwoWayAssociation}
              {intl.get("association")}
            </div>
            <div
              className={classNames(
                classes.toolItem,
                classes.firstItem,
                classes.relationItem,
                {
                  [classes.selected]:
                    pressedLineType === RelationType.TWO_WAY_AGGREGATION,
                }
              )}
              onClick={handleRelationClick(RelationType.TWO_WAY_AGGREGATION)}
            >
              {svgTwoWayAggregation}
              {intl.get("aggregation")}
            </div>
            <div
              className={classNames(
                classes.toolItem,
                classes.firstItem,
                classes.relationItem,
                {
                  [classes.selected]:
                    pressedLineType === RelationType.TWO_WAY_COMBINATION,
                }
              )}
              onClick={handleRelationClick(RelationType.TWO_WAY_COMBINATION)}
            >
              {svgTwoWayCombination}
              {intl.get("combination")}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          sx={{ 
            "&.MuiAccordion-root": { borderLeft: 0 },
            "&.Mui-expanded": {
              margin: 0,
            },
          }}
          expanded={expandOneWayRelations}
          onChange={handleOneWayRelationsChange()}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>
              {intl.get("one-way-relation")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={classNames(
                classes.toolItem,
                classes.firstItem,
                classes.relationItem,
                {
                  [classes.selected]:
                    pressedLineType === RelationType.ONE_WAY_ASSOCIATION,
                }
              )}
              onClick={handleRelationClick(RelationType.ONE_WAY_ASSOCIATION)}
            >
              {svgOneWayAssociation}
              {intl.get("association")}
            </div>
            <div
              className={classNames(
                classes.toolItem,
                classes.firstItem,
                classes.relationItem,
                {
                  [classes.selected]:
                    pressedLineType === RelationType.ONE_WAY_AGGREGATION,
                }
              )}
              onClick={handleRelationClick(RelationType.ONE_WAY_AGGREGATION)}
            >
              {svgOneWayAggregation}
              {intl.get("aggregation")}
            </div>
            <div
              className={classNames(
                classes.toolItem,
                classes.firstItem,
                classes.relationItem,
                {
                  [classes.selected]:
                    pressedLineType === RelationType.ONE_WAY_COMBINATION,
                }
              )}
              onClick={handleRelationClick(RelationType.ONE_WAY_COMBINATION)}
            >
              {svgOneWayCombination}
              {intl.get("combination")}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          sx={{ 
            "&.MuiAccordion-root": { borderLeft: 0 },
            "&.Mui-expanded": {
              margin: 0,
            },
          }}
          expanded={expandOthers}
          onChange={handleOthersChange()}
        >
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>
              {intl.get("others")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={classNames(
                classes.toolItem,
                classes.firstItem,
                classes.relationItem,
                {
                  [classes.selected]:
                    pressedLineType === RelationType.LINK_LINE,
                }
              )}
              onClick={handleRelationClick(RelationType.LINK_LINE)}
            >
              {svgLinkLine}
              {intl.get("link-line")}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </Box>
  );
});
