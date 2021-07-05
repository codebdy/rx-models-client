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
import { ClassView } from '../grahp-canvas/class-view';
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
  
  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(!modelBoardStore.graph){
      return;
    }
    const nodeConfig = modelBoardStore.createTempClassNodeForNew() as any;
    nodeConfig.component = <ClassView />;
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
            <Typography>{intl.get('entity')}</Typography>
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
              {intl.get('entity')}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>{intl.get('relation')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className = {classNames(classes.toolItem, classes.firstItem)}>
              <svg style={{width:'40px', height:'40px'}} viewBox="0 0 24 24">
                <path 
                  fill="currentColor" strokeWidth="1"
                  d="M21 15V13H19V15H18.79A2.5 2.5 0 0 0 14.21 15H13V7H9.79A2.5 2.5 0 0 0 5.21 7H5V5H3V7H2V9H3V11H5V9H5.21A2.5 2.5 0 0 0 9.79 9H11V17H14.21A2.5 2.5 0 0 0 18.79 17H19V19H21V17H22V15M7.5 9A1 1 0 1 1 8.5 8A1 1 0 0 1 7.5 9M16.5 17A1 1 0 1 1 17.5 16A1 1 0 0 1 16.5 17Z" />
              </svg>
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
      </div>
    </div>
  );
})