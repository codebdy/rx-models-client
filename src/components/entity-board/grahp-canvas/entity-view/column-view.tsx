import React, { useState } from 'react';
import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import MdiIcon from 'components/common/mdi-icon';
import classNames from 'classnames';
import { ColumnMeta } from 'components/entity-board/meta/column-meta';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hover:{
      background:'rgba(80,111,226,0.05)',
    },
    selected:{
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
  column:ColumnMeta,
  onClick:(id:string)=>void,
  onDelete:(id:string)=>void,
  isSelected?:boolean,
  readOnly?:boolean,
  isInterface: boolean,
}){
  const {column, onClick, onDelete, isSelected, readOnly = false, isInterface} = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  const isId = column.name === 'id' && !isInterface;

  const handleClick = ()=>{
    onClick(column.uuid);
  }

  const handleDeleteClick = ()=>{
    onDelete(column.uuid);
  } 

  return (
    <div className = {
        classNames(
          classes.property, 
          {
            [classes.hover]:!readOnly&&hover,
            [classes.selected]:isSelected
          }
        )
      }
      onMouseOver = {()=>setHover(true)}
      onMouseLeave = {()=>setHover(false)}   
      onClick = {handleClick}
    >
      {
        isId &&
        <div className = {classes.pk}><MdiIcon iconClass = "mdi-key" size={14} color="green" /></div> 
      }
      
      <span className = {classes.name}>{column.name}</span>: <span className = {classes.typeText}>{column.type}</span>
      {
        hover && !readOnly&& !isId && 
        <div className = {classes.propertyTools}>
          <IconButton 
            className = {classes.propertyButton}
            onClick = {handleDeleteClick}
          >
            <MdiIcon iconClass="mdi-trash-can-outline" size={16}></MdiIcon>
          </IconButton>
        </div>        
      }

    </div>
  )
}
