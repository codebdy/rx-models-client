import React from "react";
import { Theme, Container } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { Topbar } from "./topbar";
import classNames from "classnames";
import { TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Loading from "components/common/loading";
import { useState } from "react";
import { RxEntityAuthSettings } from "entity-interface/RxEntityAuthSettings";
import { useChildrenScrollStyles } from "theme/useChildrenScrollStyles";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      flex: 1,
      display: "flex",
      flexFlow: "column",
      height: 0,
    },
    container: {
      flex: 1,
      display: "flex",
      flexFlow: "column",
      height: 0,
    },
    belowContent: {
      flex: 1,
      border: `${theme.palette.divider} solid 1px`,
      overflow: "auto",
      height: "0",
      marginTop: theme.spacing(1),
      padding: theme.spacing(2),
    },
    nodeLabel: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    actions: {
      width: "800px",
    },
    actionGrid: {
      width: "16.6%",
    },
  })
);

export const AuthBoard = () => {
  const classes = useStyles();
  // const [boardStore] = useState(new AuthBoardStore());
  const scrollStyles = useChildrenScrollStyles();
  const [entityAuths, setEntityAuths] = useState<RxEntityAuthSettings[]>([]);
  // const {data, loading, error} = useSWRQuery<PackageMeta[]>(API_PUSLISHED_SCHEMA);
  // const {
  //   data: authData,
  //   loading: authLoading,
  //   error: authError,
  // } = useMagicQuery<RxEntityAuthSettings[]>(ENTITY_AUTH_QUERY);

  // useEffect(() => {
  //   boardStore.setPackages(data || []);
  // }, [boardStore, data]);

  // useEffect(() => {
  //   setEntityAuths(authData?.data || []);
  // }, [authData]);

  // useShowServerError(error || authError);

  return (
    <Container
      sx={{
        ...scrollStyles
      }}
      maxWidth="lg"
    >
      {
        /*loading || authLoading*/ false ? (
          <Loading />
        ) : (
          <div className={classes.container}>
            <Topbar />
            <div className={classes.belowContent}>
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                selected=""
              >
                {/* {data?.map((aPackage) => {
                  return (
                    <PackageNode
                      key={aPackage.uuid}
                      packageMeta={aPackage}
                      entityAuths={entityAuths}
                    />
                  );
                })} */}
              </TreeView>
            </div>
          </div>
        )
      }
    </Container>
  );
};
