import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import classNames from 'classnames';
import MdiIcon from 'components/common/mdi-icon';
import { ClassNodeData } from '../../store/diagram';
import PropertyView from './property-view';
import { useEffect } from 'react';
import $bus from 'components/models-board/model-event/bus';
import { EVENT_BEGIN_LNIK, EVENT_INHERIT_PRESSED } from 'components/models-board/model-event/events';
import { LinkType } from 'components/models-board/store/link-action';
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
  const [isInheritPressed, setIsInheritPressed] = useState(false);
  const [hover, setHover] = useState(false);
  const data : ClassNodeData|undefined = node?.data;

  const canLink = isInheritPressed && !data?.inheritFormId;
  const handlePressInheritEvent = (isPressed:boolean)=>{
    setIsInheritPressed(isPressed);
  }
  const disableHover = isInheritPressed;

  useEffect(()=>{
    $bus.on(EVENT_INHERIT_PRESSED, handlePressInheritEvent);
    return ()=>{
      $bus.off(EVENT_INHERIT_PRESSED, handlePressInheritEvent);
    }
  },[])

  const handleHidden = ()=>{
    onHidden && onHidden();
  }

  const handleMouseDown = (event:React.MouseEvent)=>{
    const { clientX, clientY } = event;
    if(isInheritPressed){
      event.preventDefault();
      event.stopPropagation();    
      $bus.emit(EVENT_BEGIN_LNIK, {
        linkType: LinkType.inherit, 
        sourceNode: node,
        initPoint: {x:clientX, y:clientY}
      });
    }
  }

  return (
    <div 
      className={classNames(classes.root,{[classes.canLink]:canLink})}
      onMouseOver = {()=>setHover(true)}
      onMouseLeave = {()=>setHover(false)}  
      onMouseDown = {handleMouseDown}     
    >
      <div className={classes.container}>
        <div className={classes.entityName}>
          {
            data?.classType && 
            <div className = {classNames(classes.nameItem, classes.smFont)}>&lt;&lt; { data?.classType} &gt;&gt;</div>
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
            !disableHover &&
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
