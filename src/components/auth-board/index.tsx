import React from 'react';
import { makeStyles, Theme, createStyles, Container, FormControlLabel, Checkbox, Grid, FormControl, InputLabel, Select, MenuItem, TextField, IconButton, Button, SvgIcon, Switch } from '@material-ui/core';
import intl from 'react-intl-universal';
import Topbar from './topbar';
import classNames from 'classnames';
import { TreeItem, TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MdiIcon from 'components/common/mdi-icon';
import { API_PUSLISHED_SCHEMA } from 'apis/auth';
import { useSWRQuery } from 'data/use-swr-query';
import { useShowServerError } from 'store/helpers/use-show-server-error';
import { PackageMeta } from 'components/entity-board/meta/package-meta';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop:theme.spacing(2),
      flex: 1,
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
    },
    actions:{
      width:'800px',
    },
    actionGrid:{
      width: '16.6%'
    }
  }),
);

export default function AuthBoard(){
  const classes = useStyles();
  const {data, loading, error} = useSWRQuery<PackageMeta[]>(API_PUSLISHED_SCHEMA);
  console.log(data);

  useShowServerError(error);

  return (
    <Container className={classNames(classes.root, 'dragit-scrollbar')} maxWidth = "lg">
      <div className = {classes.container}>
        <Topbar />
        <div className = {classes.belowContent}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          selected = ''
        >
          {
            data?.map(aPackage=>{
              return(
                <TreeItem 
                  nodeId = {aPackage.uuid} 
                  label = {
                      <div className={classes.nodeLabel}>
                        <div>
                          <MdiIcon iconClass = "mdi-folder-outline" size={18} />
                          {aPackage.name}
                        </div>
                      </div>
                  }>
                    {
                      aPackage.entities?.map((entity)=>{
                        return(
                          <TreeItem 
                            nodeId = {entity.uuid} 
                            label = {
                                <div className={classes.nodeLabel}>
                                  <div>
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
                                    {entity.name}
                                  </div>
                                </div>
                            }>
                          </TreeItem>
                        )
                      })
                    }
                </TreeItem>
              )
            })
          }
          <TreeItem 
            nodeId = '1' 
            label = {
              <div className={classes.nodeLabel}>
                <div>
                  System
                </div>
              </div>
            }
          >
            <TreeItem 
              nodeId = '2' 
              label = {
                <div className={classes.nodeLabel}>
                  <div>
                    RxUser
                  </div>
                  <div className = {classes.actions}>
                    <Grid container alignItems = "center">
                      <Grid item className={classes.actionGrid}>
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                            />
                          }
                          label="展开"
                        />
                      </Grid>
                      <Grid item className={classes.actionGrid}>
                        <IconButton size = "small">
                          <MdiIcon iconClass = "mdi-regex"></MdiIcon>
                        </IconButton>
                      </Grid>
                      <Grid item className={classes.actionGrid}>
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
                      <Grid item className={classes.actionGrid}>
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
  
                      <Grid item className={classes.actionGrid}>
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
                      <Grid item className={classes.actionGrid}>
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
              <TreeItem 
                nodeId = '3' 
                label = {
                  <div className={classes.nodeLabel}>
                    <div>
                      name
                    </div>
                    <div className = {classes.actions}>
                      <Grid container alignItems = "center">
                        <Grid item className={classes.actionGrid}>
                        </Grid>
                        <Grid item className={classes.actionGrid}>
                          <Button style={{fontSize:'1rem'}} size = "small">
                            自己的
                          </Button>
                        </Grid>
                        <Grid item className={classes.actionGrid}>
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
                        <Grid item className={classes.actionGrid}>
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
    
                        <Grid item className={classes.actionGrid}>
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
                        <Grid item className={classes.actionGrid}>
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
    
              ></TreeItem>              
              </TreeItem>
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
