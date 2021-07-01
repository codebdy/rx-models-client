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
import { ClassView } from '../workspace/class-view';
import { svgAggregation, svgAssociation, svgCombination, svgInherit } from './const-svg';
import { PRIMARY_COLOR } from 'util/consts';
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
    moveable:{
      cursor:'move',
    },
    clickable:{
      cursor:'pointer',
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
  
  const handleTest = ()=>{
    console.log('哈哈', 'handleTest2');
  }

  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(!modelBoardStore.graph){
      return;
    }
    const nodeConfig = modelBoardStore.createNewClassNode() as any;
    nodeConfig.component = <ClassView onTest = {handleTest} />;
    const node = modelBoardStore.graph.createNode(nodeConfig);
    dnd?.start(node, e.nativeEvent as any)
  }

  const handleIneritClick = ()=>{
    modelBoardStore.setPressInherit(!modelBoardStore.isInheritPressed);
  }

  const inheritColor = modelBoardStore.isInheritPressed ? PRIMARY_COLOR : undefined;

  return (
    <div className={classes.root}>
      <div>
        <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{intl.get('class')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div 
              className = {classNames(classes.toolItem, classes.firstItem, classes.moveable)}
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
              {intl.get('class')}
            </div>
            <div className = {classNames(classes.toolItem, classes.moveable)}>
              <div style={{
                width:'45px', 
                height:'30px', 
                border:'solid 2px', 
                display:'flex', 
                flexFlow:'column', 
                padding:'0'
              }}>
              </div>
              {intl.get('enum-class')}
            </div>
            <div 
              className = {classNames(classes.toolItem, classes.clickable)}
              onClick = {handleIneritClick}
              style = {{color:inheritColor}}
            >
              {svgInherit(inheritColor)}
              {intl.get('inherit')}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>{intl.get('association')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className = {classNames(classes.toolItem, classes.firstItem)}>
              {
                svgAssociation
              }
              {intl.get('one-to-one')}
            </div>
            <div className = {classes.toolItem}>
              {
                svgAssociation
              }
              {intl.get('many-to-one')}
            </div>
            <div className = {classes.toolItem}>
              {
                svgAssociation
              }
              {intl.get('many-to-many')}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>{intl.get('aggregation')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className = {classNames(classes.toolItem, classes.firstItem)}>
              {
                svgAggregation
              }
              {intl.get('one-to-one')}
            </div>
            <div className = {classes.toolItem}>
              {
                svgAggregation
              }
              {intl.get('many-to-one')}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Typography>{intl.get('combination')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <div className = {classNames(classes.toolItem, classes.firstItem)}>
              {
                svgCombination
              }
              {intl.get('one-to-one')}
            </div>
            <div className = {classes.toolItem}>
              {
                svgCombination
              }
              {intl.get('many-to-one')}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
})