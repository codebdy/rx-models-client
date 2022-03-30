import React, { memo, useCallback } from "react";
import intl from "react-intl-universal";
import { Addon, Graph } from "@antv/x6";
import { useEffect } from "react";
import { ClassView } from "../GraphCanvas/ClassView";
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
import { StereoType } from "../meta/ClassMeta";
import { CategoryCollapse } from "./CategoryCollapse";
const { Dnd } = Addon;

export const ToolItem = memo(
  (props: {
    selected?: boolean;
    children: React.ReactNode;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }) => {
    const { children, onMouseDown, onClick, selected } = props;
    return (
      <Box
        sx={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          marginBottom: (theme) => theme.spacing(2),
          color: (theme) =>
            selected ? theme.palette.primary.main : theme.palette.text.primary,
          cursor: onClick ? "pointer" : "move",
        }}
        data-type="rect"
        onMouseDown={onMouseDown}
        onClick={onClick}
      >
        {children}
      </Box>
    );
  }
);

export const Toolbox = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const [dnd, setDnd] = React.useState<any>();
  const serviceId = useServiceId();
  const [pressedLineType, setPressedLineType] = useRecoilState(
    pressedLineTypeState(serviceId)
  );
  const scrollStyles = useScrollbarStyles(true);
  const createTempClassNodeForNew = useCreateTempClassNodeForNew(serviceId);

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

  const startDragFn = (stereoType: StereoType) => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!graph) {
        return;
      }
      const nodeConfig = createTempClassNodeForNew(stereoType) as any;
      nodeConfig.component = <ClassView />;
      const node = graph.createNode(nodeConfig);
      dnd?.start(node, e.nativeEvent as any);
    };
  };

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
      <CategoryCollapse title={intl.get("class")} defaultOpen>
        <ToolItem onMouseDown={startDragFn(StereoType.Entity)}>
          <ClassRect oneBorder={false} />
          {intl.get("entity-class")}
        </ToolItem>
        <ToolItem onMouseDown={startDragFn(StereoType.Abstract)}>
          <ClassRect stereoChar="A" oneBorder={false} />
          {intl.get("abstract-class")}
        </ToolItem>
        <ToolItem onMouseDown={startDragFn(StereoType.Enum)}>
          <ClassRect stereoChar="E" oneBorder={true} />
          {intl.get("enum")}
        </ToolItem>
        <ToolItem onMouseDown={startDragFn(StereoType.ValueObject)}>
          <ClassRect stereoChar="V" oneBorder={true} />
          {intl.get("value-object")}
        </ToolItem>
        <ToolItem onMouseDown={startDragFn(StereoType.Service)}>
          <ClassRect stereoChar="S" oneBorder={true} />
          {intl.get("service-class")}
        </ToolItem>
        <ToolItem
          selected={pressedLineType === RelationType.INHERIT}
          onClick={handleRelationClick(RelationType.INHERIT)}
        >
          {svgInherit}
          {intl.get("inherit")}
        </ToolItem>
      </CategoryCollapse>
      <CategoryCollapse title={intl.get("two-way-relation")}>
        <ToolItem
          selected={pressedLineType === RelationType.TWO_WAY_ASSOCIATION}
          onClick={handleRelationClick(RelationType.TWO_WAY_ASSOCIATION)}
        >
          {svgTwoWayAssociation}
          {intl.get("association")}
        </ToolItem>
        <ToolItem
          selected={pressedLineType === RelationType.TWO_WAY_AGGREGATION}
          onClick={handleRelationClick(RelationType.TWO_WAY_AGGREGATION)}
        >
          {svgTwoWayAggregation}
          {intl.get("aggregation")}
        </ToolItem>
        <ToolItem
          selected={pressedLineType === RelationType.TWO_WAY_COMBINATION}
          onClick={handleRelationClick(RelationType.TWO_WAY_COMBINATION)}
        >
          {svgTwoWayCombination}
          {intl.get("combination")}
        </ToolItem>
      </CategoryCollapse>
      <CategoryCollapse title={intl.get("one-way-relation")}>
        <ToolItem
          selected={pressedLineType === RelationType.ONE_WAY_ASSOCIATION}
          onClick={handleRelationClick(RelationType.ONE_WAY_ASSOCIATION)}
        >
          {svgOneWayAssociation}
          {intl.get("association")}
        </ToolItem>
        <ToolItem
          selected={pressedLineType === RelationType.ONE_WAY_AGGREGATION}
          onClick={handleRelationClick(RelationType.ONE_WAY_AGGREGATION)}
        >
          {svgOneWayAggregation}
          {intl.get("aggregation")}
        </ToolItem>
        <ToolItem
          selected={pressedLineType === RelationType.ONE_WAY_COMBINATION}
          onClick={handleRelationClick(RelationType.ONE_WAY_COMBINATION)}
        >
          {svgOneWayCombination}
          {intl.get("combination")}
        </ToolItem>
      </CategoryCollapse>
      <CategoryCollapse title={intl.get("others")} disabled>
        <ToolItem
        // onMouseDown={startDragFn(StereoType.Association)}
        >
          <ClassRect stereoChar="R" oneBorder = {true} />
          {intl.get("association-class")}
        </ToolItem>
        <ToolItem
          selected={pressedLineType === RelationType.LINK_LINE}
          //onClick={handleRelationClick(RelationType.LINK_LINE)}
        >
          {svgLinkLine}
          {intl.get("link-line")}
        </ToolItem>
      </CategoryCollapse>
    </Box>
  );
});
