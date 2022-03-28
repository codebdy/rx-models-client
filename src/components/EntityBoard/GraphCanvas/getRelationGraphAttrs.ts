import { Theme } from "@mui/material";
import { RelationType } from "../meta/RelationMeta";

const inheritMarker = "M 0,0 L 12,8 L 12,-8 L 0,0";
const diamondMarker = "M 0,0 L 9,-5 L 18,0 L 9,5 z";

export function getRelationGraphAttrs(
  theme: Theme,
  relationType: RelationType,
  isTemp?: boolean
) {
  if (relationType === RelationType.IMPLEMENTS) {
    return {
      line: {
        stroke: theme.palette.text.primary,
        strokeWidth: 1,
        strokeDasharray: "3 5",
        targetMarker: {
          tagName: "path",
          fill: theme.palette.background.default,
          stroke: theme.palette.text.primary,
          strokeWidth: 1,
          d: inheritMarker,
        },
      },
    };
  }
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
  }
  if (relationType === RelationType.TWO_WAY_ASSOCIATION) {
    return {
      line: {
        stroke: theme.palette.text.primary,
        strokeWidth: 1,
        targetMarker: {},
      },
    };
  }

  if (relationType === RelationType.TWO_WAY_AGGREGATION) {
    return {
      line: {
        stroke: theme.palette.text.primary,
        strokeWidth: 1,
        sourceMarker: {
          tagName: "path",
          fill: theme.palette.background.default,
          stroke: theme.palette.text.primary,
          strokeWidth: 1,
          d:diamondMarker,
        },
        targetMarker: {},
      },
    };
  }

  if (relationType === RelationType.TWO_WAY_COMBINATION) {
    return {
      line: {
        stroke: theme.palette.text.primary,
        strokeWidth: 1,
        sourceMarker: {
          tagName: "path",
          fill: theme.palette.text.primary,
          stroke: theme.palette.text.primary,
          strokeWidth: 1,
          d:diamondMarker,
        },
        targetMarker: {},
      },
    };
  }

  if (relationType === RelationType.ONE_WAY_ASSOCIATION) {
    return {
      line: {
        stroke: theme.palette.text.primary,
        strokeWidth: 1,
        sourceMarker: {
          tagName: "path",
          fill: theme.palette.background.default,
          stroke: theme.palette.text.primary,
          strokeWidth: 1,
          d: `
            M 16, 0
            a 4 4 0 1 1 0 1 z
            M 16,0
            L 0,6
            M 16,0
            L 0,-6
          `,
        },
        targetMarker: {
          tagName: "path",
          fill: theme.palette.background.default,
          stroke: theme.palette.text.primary,
          strokeWidth: 1,
          d: `
            M 16, 0
            a 4 4 0 1 1 0 1 z
            M 16,0
            L 0,6
            M 16,0
            L 0,-6
          `,
        },
      },
    };
  }
}
