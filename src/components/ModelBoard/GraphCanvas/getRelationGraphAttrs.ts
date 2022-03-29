import { Theme } from "@mui/material";
import { RelationType } from "../meta/RelationMeta";

const inheritMarker = "M 0,0 L 12,8 L 12,-8 L 0,0";
const diamondMarker = "M 0,0 L 9,-5 L 18,0 L 9,5 z";

export function getRelationGraphAttrs(
  theme: Theme,
  relationType: RelationType,
  isTemp?: boolean
) {
  if (relationType === RelationType.INHERIT) {
    return {
      line: {
        stroke: theme.palette.text.primary,
        strokeWidth: 1,
        targetMarker: {
          tagName: "path",
          fill: theme.palette.background.default,
          stroke: theme.palette.text.primary,
          strokeWidth: 1,
          d: inheritMarker,
        },
      },
    };
  } else if (relationType === RelationType.TWO_WAY_ASSOCIATION) {
    return {
      line: {
        stroke: theme.palette.text.primary,
        strokeWidth: 1,
        targetMarker: {},
      },
    };
  } else if (relationType === RelationType.TWO_WAY_AGGREGATION) {
    return {
      line: {
        stroke: theme.palette.text.primary,
        strokeWidth: 1,
        sourceMarker: {
          tagName: "path",
          fill: theme.palette.background.default,
          stroke: theme.palette.text.primary,
          strokeWidth: 1,
          d: diamondMarker,
        },
        targetMarker: {},
      },
    };
  } else if (relationType === RelationType.TWO_WAY_COMBINATION) {
    return {
      line: {
        stroke: theme.palette.text.primary,
        strokeWidth: 1,
        sourceMarker: {
          tagName: "path",
          fill: theme.palette.text.primary,
          stroke: theme.palette.text.primary,
          strokeWidth: 1,
          d: diamondMarker,
        },
        targetMarker: {},
      },
    };
  } else if (relationType === RelationType.ONE_WAY_ASSOCIATION) {
    return {
      line: {
        stroke: theme.palette.text.primary,
        strokeWidth: 1,
      },
    };
  } else if (relationType === RelationType.ONE_WAY_AGGREGATION) {
    return {
      line: {
        stroke: theme.palette.text.primary,
        strokeWidth: 1,
        sourceMarker: {
          tagName: "path",
          fill: theme.palette.background.default,
          stroke: theme.palette.text.primary,
          strokeWidth: 1,
          d: diamondMarker,
        },
      },
    };
  } else if (relationType === RelationType.ONE_WAY_COMBINATION) {
    return {
      line: {
        stroke: theme.palette.text.primary,
        strokeWidth: 1,
        sourceMarker: {
          tagName: "path",
          fill: theme.palette.text.primary,
          stroke: theme.palette.text.primary,
          strokeWidth: 1,
          d: diamondMarker,
        },
      },
    };
  } else if (relationType === RelationType.LINK_LINE) {
    return {
      line: {
        stroke: theme.palette.text.primary,
        strokeWidth: 1,
        strokeDasharray: '3 5',
        sourceMarker: {},
        targetMarker: {},
      },
    };
  }
}
