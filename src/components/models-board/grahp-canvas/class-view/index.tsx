import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import classNames from 'classnames';
import MdiIcon from 'components/common/mdi-icon';
import { ClassNodeData } from '../../store/diagram';
import PropertyView from './property-view';
import { useEffect } from 'react';
import $bus from 'components/models-board/model-event/bus';
import { EVENT_RELATION_PRESSED } from 'components/models-board/model-event/events';
import { RelationType } from 'components/models-board/meta/relation-meta';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexFlow: 'column',
      background: '#FFFFFF',
      overflow: 'hidden',
    },
    canLink:{
      cursor: 'crosshair'
    },
    container:{
      flex:1,
      border: 'solid 2px',
      borderRadius: '5px',
      display: 'flex',
      flexFlow: 'column',
      background: '#FFFFFF',
      overflow: 'hidden',
    },
    entityName:{
      width:'100%',
      padding:'2px 0',
      display: 'flex',
      flexFlow: 'column',
      position: 'relative',
    },
    entityCloseButton:{
      width: '24px',
      height: '24px',
      zIndex:1,
      position: 'absolute',
      right:'0',
      top: '0'
    },
    propertiesArea:{
      flex:1,
      display: 'flex',
      flexFlow: 'column',
      borderTop: 'solid 1px',
    },
    defaultCusor:{
      cursor:'default',
    },
    nameItem:{
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
    },
    smFont:{
      fontSize: '0.9rem',
    },
    propertyPlus:{
      display: 'flex',
      justifyContent: 'center',
    },
    propertyButton:{
      width: '24px',
      height: '24px',
    },

  }),
);  

export const ClassView = (props:{
  node?:any,
  onHidden?:()=>void,
  onDeleteProperty?:(id:string)=>void,
  onAddProperty?:()=>void,
  onSelectProperty?:()=>void
}) =>{
  const classes = useStyles();
  const {node, onHidden} = props;
  const [pressedRelation, setPressedRelation] = useState<RelationType>();
  const [hover, setHover] = useState(false);
  const data : ClassNodeData|undefined = node?.data;

  const canLink = pressedRelation;
  const handlePressRelation = (relationType:RelationType)=>{
    setPressedRelation(relationType);
  }
  const disableHover = !!pressedRelation;

  useEffect(()=>{
    $bus.on(EVENT_RELATION_PRESSED, handlePressRelation);
    return ()=>{
      $bus.off(EVENT_RELATION_PRESSED, handlePressRelation);
    }
  },[])

  const handleHidden = ()=>{
    onHidden && onHidden();
  }

  return (
    <div 
      className={classNames(classes.root,{[classes.canLink]:canLink})}
      onMouseOver = {()=>setHover(true)}
      onMouseLeave = {()=>setHover(false)}  
    >
      <div className={classes.container}>
        <div className={classes.entityName}>
          {
            data?.entityType && 
            <div className = {classNames(classes.nameItem, classes.smFont)}>&lt;&lt; { data?.entityType} &gt;&gt;</div>
          }
          <div className = {classes.nameItem}>{data?.name}</div>
          {
            data?.packageName && 
            <div className = {classNames(classes.nameItem, classes.smFont)}><em>{data?.packageName}</em></div>
          }
          {
            hover && !disableHover &&
            <IconButton className = {classes.entityCloseButton}
              onClick = {handleHidden}
            >
              <MdiIcon iconClass="mdi-eye-off-outline" size={16}></MdiIcon>
            </IconButton>          
          }

        </div>
        <div className = {
          classNames(classes.propertiesArea,
            {[classes.canLink]:canLink, [classes.defaultCusor]:!canLink}
          )
        }>
          {
            data?.columns.map(column=>{
              return (<PropertyView key = {column.id} name= {column.name} type = {column.type} readOnly = {disableHover}/>)
            })
          }
          {
            hover && !disableHover &&
            <div className = {classes.propertyPlus}>
              <IconButton className = {classes.propertyButton}>
                <MdiIcon iconClass="mdi-plus" size={20}></MdiIcon>
              </IconButton>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
