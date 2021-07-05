import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import intl from 'react-intl-universal';
import { Accordion } from './accordion';
import { AccordionSummary } from './accordion-summary';
import { AccordionDetails } from './accordion-details';
import { useModelsBoardStore } from '../store';
import { Addon } from '@antv/x6'
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { EntityView } from '../grahp-canvas/entity-view';
import { svgManyToMany, svgOneToMany, svgOneToOne } from './const-svg';
import { RelationType } from '../meta/relation-meta';
const { Dnd } = Addon

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display:'flex',
      flexFlow:'column',
      borderRight: `solid 1px ${theme.palette.divider}`,
      width:'100px',
      alignItems:'center',
      overflowY:'auto',
      overflowX:'hidden',
    },
    toolItem:{
      display:'flex',
      flexFlow:'column',
      alignItems: 'center',
      marginTop: theme.spacing(2),
    },
    firstItem:{
      marginTop: theme.spacing(0),
    },
    relationItem:{
      cursor:'pointer',
    },
    moveable:{
      cursor:'move',
    },
    clickable:{
      cursor:'pointer',
    },
    selected:{
      color:theme.palette.primary.main,
    }
  }),
);

export const Toolbox = observer(() => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const [dnd, setDnd] = React.useState<any>();
  const modelBoardStore = useModelsBoardStore();
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(()=>{
    const theDnd = modelBoardStore.graph
    ? new Dnd({
      target: modelBoardStore.graph,
      scaled: false,
      animation: true,

    })
    : undefined;
    setDnd(theDnd);
  },[modelBoardStore.graph])
  
  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(!modelBoardStore.graph){
      return;
    }
    const nodeConfig = modelBoardStore.createTempClassNodeForNew() as any;
    nodeConfig.component = <EntityView />;
    const node = modelBoardStore.graph.createNode(nodeConfig);
    dnd?.start(node, e.nativeEvent as any)
  }

  const handleOneToOneClick = ()=>{
    if(RelationType.ONE_TO_ONE === modelBoardStore.pressedLineType){
      modelBoardStore.setPressRelation(undefined);  
    }else{
      modelBoardStore.setPressRelation(RelationType.ONE_TO_ONE);      
    }

  }

  const handleOneToManyClick = ()=>{
    if(RelationType.ONE_TO_MANY === modelBoardStore.pressedLineType){
      modelBoardStore.setPressRelation(undefined);  
    }else{
      modelBoardStore.setPressRelation(RelationType.ONE_TO_MANY);      
    }
  }

  const handleManyToManyClick = ()=>{
    if(RelationType.MANY_TO_MANY === modelBoardStore.pressedLineType){
      modelBoardStore.setPressRelation(undefined);  
    }else{
      modelBoardStore.setPressRelation(RelationType.MANY_TO_MANY);      
    }
  }

  return (
    <div className={classes.root}>
      <div>
        <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{intl.get('entity')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div 
              className = {classNames(
                classes.toolItem, 
                classes.firstItem, classes.moveable,
              )}
              data-type="rect"
              onMouseDown={startDrag}
            >
              <div style={{
                width:'45px', 
                height:'30px', 
                border:'solid 2px', 
                display:'flex', 
                flexFlow:'column', 
                padding:'0'
              }}>
                <div style={{height:'30%', width:'47px', borderBottom:'solid 1px', marginLeft:'-1px'}}></div>
              </div>
              {intl.get('entity')}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>{intl.get('relation')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div 
              className = {classNames(
                classes.toolItem, 
                classes.firstItem,
                classes.relationItem,
                {[classes.selected]:modelBoardStore.pressedLineType === RelationType.ONE_TO_ONE}
              )}
              onClick = {handleOneToOneClick}
            >
              {
                svgOneToOne
              }
              {intl.get('one-to-one')}
            </div>
            <div 
              className = {classNames(
                classes.toolItem, 
                classes.relationItem,
                {[classes.selected]:modelBoardStore.pressedLineType === RelationType.ONE_TO_MANY}
              )}
              onClick = {handleOneToManyClick}
            >
              {
                svgOneToMany
              }
              {intl.get('one-to-many')}
            </div>
            <div 
              className = {classNames(
                classes.toolItem, 
                classes.relationItem,
                {[classes.selected]:modelBoardStore.pressedLineType === RelationType.MANY_TO_MANY}
              )}
              onClick = {handleManyToManyClick}            
            >
              {
                svgManyToMany
              }
              {intl.get('many-to-many')}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
})