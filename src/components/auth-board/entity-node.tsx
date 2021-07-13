import { createStyles, FormControlLabel, Grid, IconButton, makeStyles, SvgIcon, Switch, Theme, Tooltip } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import MdiIcon from "components/common/mdi-icon";
import { EntityMeta } from "components/entity-board/meta/entity-meta";
import { ActionLabel } from "./action-label";
import { AuthAction } from "./auth-action";
import { NodeLabel } from "./node-label";
import { ColumnNode } from "./column-node";
import { ExpressArea } from "./express-area";
import { useState } from "react";
import intl from 'react-intl-universal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionArea:{
      display:'flex',
    },
    nodeName:{
      display:'flex',
      alignItems:'center',
    },
    columnOrRelation:{
      fontSize:'0.9rem',
      padding:theme.spacing(0.8, 0),
    }
  }),
);

export function EntityNode(props:{
  entityMeta: EntityMeta
}){
  const {entityMeta} = props; 
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [expand, setExpand] = useState(false);

  const hanldeExpandChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setExpand(event.target.checked);
  }
  return(
     <TreeItem 
        nodeId = {entityMeta.uuid} 
        label = {
          <NodeLabel 
            onMouseOver = {()=>setHover(true)}
            onMouseLeave = {()=>setHover(false)}  
          >
            <div className={classes.nodeName}>
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
            <div className = {classes.actionArea} onClick = {(e)=>e.stopPropagation()}>
              <ExpressArea>
                <Grid item xs={4}>
                  {
                    hover &&
                    <FormControlLabel
                      control={
                        <Switch
                          color="primary"
                          size = "small"
                          checked = {expand}
                          onChange = {hanldeExpandChange}
                        />
                      }
                      label={<ActionLabel>{intl.get('expand')}</ActionLabel>}
                    />                    
                  }

                </Grid>
                <Grid item>
                  {
                    hover &&
                    <Tooltip title={intl.get('express-tip')}>
                      <IconButton size = "small">
                        <MdiIcon iconClass = "mdi-regex" size={18}></MdiIcon>
                      </IconButton>
                    </Tooltip>                    
                  }
                </Grid>
              </ExpressArea>
              <AuthAction/>
            </div>
          </NodeLabel>
      }>

      {
        expand && 
        entityMeta.columns.map(column=>{
          return (
            <ColumnNode key = {column.uuid} columnMeta = {column} />
          )
        })
      }

    </TreeItem>
  )
}