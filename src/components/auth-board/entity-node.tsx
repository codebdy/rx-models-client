import { CircularProgress, createStyles, FormControlLabel, Grid, makeStyles, SvgIcon, Switch, Theme } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import { EntityMeta } from "components/entity-board/meta/entity-meta";
import { ActionLabel } from "./action-label";
import { AbilityActions } from "./ability-actions";
import { NodeLabel } from "./node-label";
import { ColumnNode } from "./column-node";
import { ExpressArea } from "./express-area";
import { useState } from "react";
import intl from 'react-intl-universal';
import { useShowServerError } from "store/helpers/use-show-server-error";
import { createId } from "util/creat-id";
import { mutate } from "swr";
import { ENTITY_AUTH_QUERY } from "./consts";
import { observer } from "mobx-react";
import { RxEntityAuthSettings } from "entity-interface/RxEntityAuthSettings";
import { MagicPostBuilder, useLayzyMagicPost } from "@rxdrag/rxmodels-swr";

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

export const EntityNode = observer((props:{
  entityMeta: EntityMeta,
  entityAuth?: RxEntityAuthSettings,
  entityAuths: RxEntityAuthSettings[]
})=>{
  const {entityMeta, entityAuth, entityAuths} = props; 
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [excutePost, {loading, error}] = useLayzyMagicPost({
    onCompleted(data:any){
      mutate(
        ENTITY_AUTH_QUERY.toUrl(), 
        {
          data:[
            ...entityAuths.filter(entithAth=>entithAth.entityUuid !== entityAuth?.entityUuid), 
            data.RxEntityAuthSettings
          ]
        }
      )
    }
  });

  useShowServerError(error);

  const hanldeExpandChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const auth = entityAuth ? entityAuth : {uuid: createId(), entityUuid: entityMeta.uuid}
    const data = new MagicPostBuilder()
      .setEntity('RxEntityAuthSettings')
      .setSingleData({...auth, expand:event.target.checked})
      .toData()
    excutePost({data});
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
                <Grid item xs={6}>
                  {
                    (hover||entityAuth?.expand) && !loading &&
                    <FormControlLabel
                      control={
                        <Switch
                          color="primary"
                          size = "small"
                          checked = {entityAuth?.expand||false}
                          onChange = {hanldeExpandChange}
                        />
                      }
                      label={<ActionLabel>{intl.get('expand')}</ActionLabel>}
                    />                    
                  }
                  {
                    loading && 
                    <CircularProgress size = { 24 } />
                  }

                </Grid>
              </ExpressArea>
              { 
                <AbilityActions entityMeta = {entityMeta} />
              }
              
            </div>
          </NodeLabel>
      }>

      {
        entityAuth?.expand && 
        entityMeta.columns.map(column=>{
          return (
            column.name !== 'id'
              ? <ColumnNode 
                  key = {column.uuid} 
                  entityMeta = {entityMeta}
                  columnMeta = {column} 
                />
              : undefined
          )
        })
      }

    </TreeItem>
  )
})