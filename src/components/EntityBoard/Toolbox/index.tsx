import React, { memo } from "react";
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
  svgManyToMany,
  svgManyToOne,
  svgOneToMany,
  svgOneToOne,
} from "./constSvg";
import { RelationType } from "../meta/relation-meta";
import { pressedLineTypeState } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import { createTempClassNodeForNew } from "../GraphCanvas/createTempClassNodeForNew";
const { Dnd } = Addon;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexFlow: "column",
      borderRight: `solid 1px ${theme.palette.divider}`,
      width: "100px",
      alignItems: "center",
      overflowY: "auto",
      overflowX: "hidden",
    },
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
  const [expandRelations, setExpandRelations] = React.useState(true);
  const [dnd, setDnd] = React.useState<any>();
  const [pressedLineType, setPressedLineType] = useRecoilState(pressedLineTypeState);
  
  const handleEneitiesChange =
    () => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setExpandEntites(!expandEntites);
    };

  const handleRelationsChange =
    () => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setExpandRelations(!expandRelations);
    };

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

  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!graph) {
      return;
    }
    const nodeConfig = createTempClassNodeForNew() as any;
    nodeConfig.component = <EntityView />;
    const node = graph.createNode(nodeConfig);
    dnd?.start(node, e.nativeEvent as any);
  };

  const handleInheritClick = () => {
    if (RelationType.INHERIT === pressedLineType) {
      setPressedLineType(undefined);
    } else {
      setPressedLineType(RelationType.INHERIT);
    }
  };

  const handleOneToOneClick = () => {
    if (RelationType.ONE_TO_ONE === pressedLineType) {
      setPressedLineType(undefined);
    } else {
      setPressedLineType(RelationType.ONE_TO_ONE);
    }
  };

  const handleOneToManyClick = () => {
    if (RelationType.ONE_TO_MANY === pressedLineType) {
      setPressedLineType(undefined);
    } else {
      setPressedLineType(RelationType.ONE_TO_MANY);
    }
  };

  const handleManyToOneClick = () => {
    if (RelationType.MANY_TO_ONE === pressedLineType) {
      setPressedLineType(undefined);
    } else {
      setPressedLineType(RelationType.MANY_TO_ONE);
    }
  };

  const handleManyToManyClick = () => {
    if (RelationType.MANY_TO_MANY === pressedLineType) {
      setPressedLineType(undefined);
    } else {
      setPressedLineType(RelationType.MANY_TO_MANY);
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <Accordion
          square
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
                [classes.selected]:
                  pressedLineType === RelationType.INHERIT,
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
          expanded={expandRelations}
          onChange={handleRelationsChange()}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>{intl.get("relation")}</Typography>
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
    </div>
  );
});
