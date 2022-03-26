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
  svgImplement,
  svgInherit,
  svgManyToMany,
  svgManyToOne,
  svgOneToMany,
  svgOneToOne,
} from "./constSvg";
import { RelationType } from "../meta/RelationMeta";
import { pressedLineTypeState } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import { useCreateTempClassNodeForNew } from "../hooks/useCreateTempClassNodeForNew";
import { useScrollbarStyles } from "theme/useScrollbarStyles";
import { Box } from "@mui/material";
import { useServiceId } from "../hooks/useServiceId";
const { Dnd } = Addon;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolItem: {
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      marginTop: theme.spacing(2),
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

  const startDrag = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!graph) {
      return;
    }
    const nodeConfig = createTempClassNodeForNew() as any;
    nodeConfig.component = <EntityView />;
    const node = graph.createNode(nodeConfig);
    dnd?.start(node, e.nativeEvent as any);
  }, [createTempClassNodeForNew, dnd, graph]);

  const handleInheritClick = useCallback(() => {
    if (RelationType.IMPLEMENTS === pressedLineType) {
      setPressedLineType(undefined);
    } else {
      setPressedLineType(RelationType.IMPLEMENTS);
    }
  }, [pressedLineType, setPressedLineType]);

  const handleOneToOneClick = useCallback(() => {
    if (RelationType.ONE_TO_ONE === pressedLineType) {
      setPressedLineType(undefined);
    } else {
      setPressedLineType(RelationType.ONE_TO_ONE);
    }
  }, [pressedLineType, setPressedLineType]);

  const handleOneToManyClick = useCallback(() => {
    if (RelationType.ONE_TO_MANY === pressedLineType) {
      setPressedLineType(undefined);
    } else {
      setPressedLineType(RelationType.ONE_TO_MANY);
    }
  }, [pressedLineType, setPressedLineType]);

  const handleManyToOneClick = useCallback(() => {
    if (RelationType.MANY_TO_ONE === pressedLineType) {
      setPressedLineType(undefined);
    } else {
      setPressedLineType(RelationType.MANY_TO_ONE);
    }
  }, [pressedLineType, setPressedLineType]);

  const handleManyToManyClick = useCallback(() => {
    if (RelationType.MANY_TO_MANY === pressedLineType) {
      setPressedLineType(undefined);
    } else {
      setPressedLineType(RelationType.MANY_TO_MANY);
    }
  }, [pressedLineType, setPressedLineType]);

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
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{intl.get("entity")}</Typography>
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
              <div
                style={{
                  width: "45px",
                  height: "30px",
                  border: "solid 2px",
                  display: "flex",
                  flexFlow: "column",
                  padding: "0",
                }}
              >
                <div
                  style={{
                    height: "30%",
                    width: "47px",
                    borderBottom: "solid 1px",
                    marginLeft: "-1px",
                  }}
                ></div>
              </div>
              {intl.get("entity")}
            </div>
            <div
              className={classNames(classes.toolItem, classes.relationItem, {
                [classes.selected]: pressedLineType === RelationType.IMPLEMENTS,
              })}
              onClick={handleInheritClick}
            >
              {svgImplement}
              {intl.get("implements")}
            </div>
            <div
              className={classNames(classes.toolItem, classes.relationItem, {
                [classes.selected]: pressedLineType === RelationType.IMPLEMENTS,
              })}
              onClick={handleInheritClick}
            >
              {svgInherit}
              {intl.get("inherit")}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          sx={{ "&.MuiAccordion-root": { borderLeft: 0 } }}
          expanded={expandTwoWayRelations}
          onChange={handleTwoWayRelationsChange()}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>{intl.get("two-way-relation")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={classNames(
                classes.toolItem,
                classes.firstItem,
                classes.relationItem,
                {
                  [classes.selected]:
                    pressedLineType === RelationType.ONE_TO_ONE,
                }
              )}
              onClick={handleOneToOneClick}
            >
              {svgOneToOne}
              {intl.get("one-to-one")}
            </div>
            <div
              className={classNames(classes.toolItem, classes.relationItem, {
                [classes.selected]:
                  pressedLineType === RelationType.ONE_TO_MANY,
              })}
              onClick={handleOneToManyClick}
            >
              {svgOneToMany}
              {intl.get("one-to-many")}
            </div>
            <div
              className={classNames(classes.toolItem, classes.relationItem, {
                [classes.selected]:
                  pressedLineType === RelationType.MANY_TO_ONE,
              })}
              onClick={handleManyToOneClick}
            >
              {svgManyToOne}
              {intl.get("many-to-one")}
            </div>

            <div
              className={classNames(classes.toolItem, classes.relationItem, {
                [classes.selected]:
                  pressedLineType === RelationType.MANY_TO_MANY,
              })}
              onClick={handleManyToManyClick}
            >
              {svgManyToMany}
              {intl.get("many-to-many")}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          sx={{ "&.MuiAccordion-root": { borderLeft: 0 } }}
          expanded={expandOneWayRelations}
          onChange={handleOneWayRelationsChange()}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>{intl.get("one-way-relation")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={classNames(
                classes.toolItem,
                classes.firstItem,
                classes.relationItem,
                {
                  [classes.selected]:
                    pressedLineType === RelationType.ONE_TO_ONE,
                }
              )}
              onClick={handleOneToOneClick}
            >
              {svgOneToOne}
              {intl.get("one-to-one")}
            </div>
            <div
              className={classNames(classes.toolItem, classes.relationItem, {
                [classes.selected]:
                  pressedLineType === RelationType.ONE_TO_MANY,
              })}
              onClick={handleOneToManyClick}
            >
              {svgOneToMany}
              {intl.get("one-to-many")}
            </div>
            <div
              className={classNames(classes.toolItem, classes.relationItem, {
                [classes.selected]:
                  pressedLineType === RelationType.MANY_TO_ONE,
              })}
              onClick={handleManyToOneClick}
            >
              {svgManyToOne}
              {intl.get("many-to-one")}
            </div>

            <div
              className={classNames(classes.toolItem, classes.relationItem, {
                [classes.selected]:
                  pressedLineType === RelationType.MANY_TO_MANY,
              })}
              onClick={handleManyToManyClick}
            >
              {svgManyToMany}
              {intl.get("many-to-many")}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </Box>
  );
});
