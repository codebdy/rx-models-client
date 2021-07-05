import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import MdiIcon from 'components/common/mdi-icon';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hover:{
      background:'rgba(80,111,226,0.1)',
    },
    name:{
      marginLeft: '3px',
    },
    property:{
      position:'relative',
      fontSize: '0.9rem',
      padding:'2px 0',
      display:'flex',
    },
    propertyTools:{
      zIndex:1,
      position: 'absolute',
      right:'4px',
      top:'0',
    },
    propertyButton:{
      width: '24px',
      height: '24px',
    },

    typeText:{
      fontSize: '0.8rem',
      marginLeft: '5px',
    },

    pk:{
      fontSize: '1rem',
      marginLeft: '3px',
    }
  }),
);

export default function ColumnView(props:{
  name:string,
  type:string,
  readOnly?:boolean,
}){
  const {name, type, readOnly = false} = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  const isId = name === 'id';

  return (
    <div className = {classNames(classes.property, {[classes.hover]:!readOnly&&hover})}
      onMouseOver = {()=>setHover(true)}
      onMouseLeave = {()=>setHover(false)}   
    >
      {
        isId &&
        <div className = {classes.pk}><MdiIcon iconClass = "mdi-key" size={14} color="green" /></div> 
      }
      
      <span className = {classes.name}>{name}</span>: <span className = {classes.typeText}>{type}</span>
      {
        hover && !readOnly&& !isId && 
        <div className = {classes.propertyTools}>
          <IconButton className = {classes.propertyButton}>
            <MdiIcon iconClass="mdi-pencil-outline" size={16}></MdiIcon>
          </IconButton>
          <IconButton className = {classes.propertyButton}>
            <MdiIcon iconClass="mdi-trash-can-outline" size={16}></MdiIcon>
          </IconButton>
        </div>        
      }

    </div>
  )
}
