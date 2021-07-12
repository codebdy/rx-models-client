import React from 'react';
import { makeStyles, Theme, createStyles, Container, FormControlLabel, Checkbox, Grid, FormControl, InputLabel, Select, MenuItem, TextField, IconButton, Button } from '@material-ui/core';
import intl from 'react-intl-universal';
import Topbar from './topbar';
import classNames from 'classnames';
import { TreeItem, TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MdiIcon from 'components/common/mdi-icon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop:theme.spacing(2),
      flex: 1,
      maxWidth:'800px',
      display: 'flex',
      flexFlow: 'column',
      height: 0,
    },
    container:{
      flex: 1,
      display: 'flex',
      flexFlow: 'column',
      height: 0,
    },
    belowContent:{
      flex: 1,
      border:`${theme.palette.divider} solid 1px`,
      overflow: 'auto',
      height: '0',
      marginTop: theme.spacing(1),
      padding: theme.spacing(2),
    },
    nodeLabel:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }),
);

export default function AuthBoard(){
  const classes = useStyles();

  return (
    <Container className={classNames(classes.root, 'dragit-scrollbar')} >
      <div className = {classes.container}>
        <Topbar />
        <div className = {classes.belowContent}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <TreeItem 
            nodeId = '1' 
            label = {
              <div className={classes.nodeLabel}>
                <div>
                  System
                </div>
                <div>
                  <Grid container>
                    <Grid item>
                      <Button style={{fontSize:'1rem'}} size = "small">
                        条件 <MdiIcon iconClass = "mdi-dots-horizontal" size = {16} />
                      </Button>
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            //checked={state.checkedB}
                            //onChange={handleChange}
                            color="primary"
                          />
                        }
                        label="读取"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            //checked={state.checkedB}
                            //onChange={handleChange}
                            color="primary"
                          />
                        }
                        label="创建"
                      />
                    </Grid>

                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            //checked={state.checkedB}
                            //onChange={handleChange}
                            color="primary"
                          />
                        }
                        label="修改"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            //checked={state.checkedB}
                            //onChange={handleChange}
                            color="primary"
                          />
                        }
                        label="删除"
                      />
                    </Grid>
                  </Grid>
                </div>
              </div>
            }
          >
            <TreeItem nodeId = '2' label = {'fff'}></TreeItem>
          </TreeItem>
          <TreeItem nodeId = '11' label = {'dddd'}>
            <TreeItem nodeId = '12' label = {'fff'}></TreeItem>
          </TreeItem>
        </TreeView>
        </div>
      </div>
    </Container>
  )
}
