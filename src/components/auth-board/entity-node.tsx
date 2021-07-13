import { createStyles, FormControlLabel, Grid, IconButton, makeStyles, SvgIcon, Switch, Theme } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { EntityMeta } from "components/entity-board/meta/entity-meta";
import { AuthAction } from "./auth-action";
import { NodeLabel } from "./node-label";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionArea:{
      display:'flex',
    },
    hoverAction: {
      width:'200px',
    },
  }),
);

export function EntityNode(props:{
  entityMeta: EntityMeta
}){
  const {entityMeta} = props; 
  const classes = useStyles();

  return(
     <TreeItem 
        nodeId = {entityMeta.uuid} 
        label = {
          <NodeLabel>
            <div>
              <SvgIcon>
                <path d="
                  M 1,6
                  L 14,6
                  L 14,19
                  L 1,19
                  L 1,6
                  M 1,11
                  L 14,11
                " stroke="#000" strokeWidth="1" fill="#fff"></path>
              </SvgIcon>
              {entityMeta.name}
              
            </div>
            <div className = {classes.actionArea}>
              <Grid container className = {classes.hoverAction} alignItems = "center">
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Switch
                          color="primary"
                        />
                      }
                      label="展开"
                    />
                  </Grid>
                  <Grid item>
                    <IconButton size = "small">
                      <MdiIcon iconClass = "mdi-regex"></MdiIcon>
                    </IconButton>
                  </Grid>
              </Grid>
              <AuthAction/>
            </div>
          </NodeLabel>
      }>
    </TreeItem>
  )
}