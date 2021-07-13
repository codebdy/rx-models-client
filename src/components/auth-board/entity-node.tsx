import { createStyles, FormControlLabel, Grid, makeStyles, SvgIcon, Switch, Theme } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import { EntityMeta } from "components/entity-board/meta/entity-meta";
import { ActionLabel } from "./action-label";
import { AuthAction } from "./auth-action";
import { NodeLabel } from "./node-label";
import { ColumnNode } from "./column-node";
import { ExpressArea } from "./express-area";
import { useState } from "react";
import intl from 'react-intl-universal';
import ExpressDialog from "./express-dialog";
import { AbilityCondition } from "./express-dialog/ability-condition";

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
  const [expressDlgOpen, setExpressDlgOpen] = useState(false);
  const [conditions, setConditions] = useState<AbilityCondition[]>([]);

  const hanldeExpandChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setExpand(event.target.checked);
  }

  const handleExpressDlgOpenChange = (open:boolean)=>{
    setExpressDlgOpen(open);
  }

  const handleConditionChange = (abilityCondigions:AbilityCondition[])=>{
    setConditions(abilityCondigions);
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
                    (hover||expand) &&
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
                    (hover || expressDlgOpen) &&
                    <ExpressDialog 
                      onOpenChange = {handleExpressDlgOpenChange}  
                      abilityCondigions = {conditions} 
                      onChange = {handleConditionChange}
                    />         
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