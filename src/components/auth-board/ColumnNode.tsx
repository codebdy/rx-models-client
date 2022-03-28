import { SvgIcon, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { TreeItem } from "@mui/lab";
import { AttributeMeta } from "components/ModelBoard/meta/AttributeMeta";
import { AbilityActions } from "./ability-actions";
import { NameLabel } from "./name-label";
import { NodeLabel } from "./NodeLabel";
import { observer } from "mobx-react";
import { ClassMeta } from "components/ModelBoard/meta/ClassMeta";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nodeName: {
      display: "flex",
      alignItems: "center",
    },
    actionArea: {
      display: "flex",
    },
  })
);

export const AttributeNode = observer(
  (props: { entityMeta: ClassMeta; columnMeta: AttributeMeta }) => {
    const { entityMeta, columnMeta } = props;
    const classes = useStyles();

    return (
      <TreeItem
        nodeId={columnMeta.uuid}
        label={
          <NodeLabel>
            <div className={classes.nodeName}>
              <SvgIcon sx={{ fontSize: 12 }}>
                <path
                  fill="currentColor"
                  d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12Z"
                />
              </SvgIcon>
              <NameLabel>{columnMeta.name}</NameLabel>
            </div>
            <div className={classes.actionArea}>
              <AbilityActions
                entityMeta={entityMeta}
                columnUuid={columnMeta.uuid}
              />
            </div>
          </NodeLabel>
        }
      ></TreeItem>
    );
  }
);
