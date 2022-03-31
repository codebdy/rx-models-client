import React, { useCallback } from "react";
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  SvgIcon,
  Theme,
} from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import intl from "react-intl-universal";
import { useCreateNewClass } from "../hooks/useCreateNewClass";
import { useCreateNewDiagram } from "../hooks/useCreateNewDiagram";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { useSetRecoilState } from "recoil";
import { classesState, selectedDiagramState } from "../recoil/atoms";
import { useServiceId } from "../hooks/useServiceId";
import { StereoType } from "../meta/ClassMeta";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      marginLeft: "16px",
    },
  })
);

export default function LocalModelAction(props: {
  onPublish: () => void;
  onDownloadJson: () => void;
  onExportInterface: () => void;
}) {
  const { onPublish, onDownloadJson, onExportInterface } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const serviceId = useServiceId();
  const createNewClass = useCreateNewClass(serviceId);
  const createNewDiagram = useCreateNewDiagram(serviceId);
  const setEntities = useSetRecoilState(classesState(serviceId));
  const setSelectedDiagram = useSetRecoilState(selectedDiagramState(serviceId));
  const backupSnapshot = useBackupSnapshot(serviceId);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  const addClass = useCallback(
    (stereoType: StereoType) => {
      backupSnapshot();
      const newClass = createNewClass(stereoType);
      setEntities((classes) => [...classes, newClass]);
      setAnchorEl(null);
    },
    [backupSnapshot, createNewClass, setEntities]
  );

  const handleAddEntity = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      addClass(StereoType.Entity);
      event.stopPropagation();
    },
    [addClass]
  );

  const handleAddEnum = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      addClass(StereoType.Enum);
      event.stopPropagation();
    },
    [addClass]
  );

  const handleAddValueObject = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      addClass(StereoType.ValueObject);
      event.stopPropagation();
    },
    [addClass]
  );

  const handleAddService = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      addClass(StereoType.Service);
      event.stopPropagation();
    },
    [addClass]
  );
  const handleAddDiagram = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      backupSnapshot();
      const newDiagram = createNewDiagram();
      setSelectedDiagram(newDiagram.uuid);
      setAnchorEl(null);
      event.stopPropagation();
    },
    [backupSnapshot, createNewDiagram, setSelectedDiagram]
  );

  const handlePublish = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      onPublish();
      setAnchorEl(null);
      event.stopPropagation();
    },
    [onPublish]
  );

  const handleDownloadJson = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      onDownloadJson();
      setAnchorEl(null);
      event.stopPropagation();
    },
    [onDownloadJson]
  );

  const handleExportInterface = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      onExportInterface();
      setAnchorEl(null);
      event.stopPropagation();
    },
    [onExportInterface]
  );

  return (
    <>
      <IconButton size="small" onClick={handleMenuOpen}>
        <MoreVertOutlinedIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        //getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleAddDiagram}>
          <SvgIcon fontSize="small">
            <path
              fill="currentColor"
              d="M12,14V11H10V14H7V16H10V19H12V16H15V14M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18"
            />
          </SvgIcon>
          <span className={classes.text}>{intl.get("add-diagram")} </span>
        </MenuItem>
        <MenuItem onClick={handleAddEntity}>
          <SvgIcon fontSize="small">
            <path
              fill="currentColor"
              d="M17 2H19V5H22V7H19V10H17V7H14V5H17V2M7 5H11V7H7C5.9 7 5 7.9 5 9V17C5 18.11 5.9 19 7 19H15C16.11 19 17 18.11 17 17V13H19V17C19 19.21 17.21 21 15 21H7C4.79 21 3 19.21 3 17V9C3 6.79 4.79 5 7 5Z"
            />
          </SvgIcon>
          <span className={classes.text}>{intl.get("add-entity-class")} </span>
        </MenuItem>
        <MenuItem onClick={handleAddEnum}>
          <SvgIcon fontSize="small">
            <path
              fill="currentColor"
              d="M17 2H19V5H22V7H19V10H17V7H14V5H17V2M7 5H11V7H7C5.9 7 5 7.9 5 9V17C5 18.11 5.9 19 7 19H15C16.11 19 17 18.11 17 17V13H19V17C19 19.21 17.21 21 15 21H7C4.79 21 3 19.21 3 17V9C3 6.79 4.79 5 7 5Z"
            />
          </SvgIcon>
          <span className={classes.text}>{intl.get("add-enum-class")} </span>
        </MenuItem>
        <MenuItem onClick={handleAddValueObject}>
          <SvgIcon fontSize="small">
            <path
              fill="currentColor"
              d="M17 2H19V5H22V7H19V10H17V7H14V5H17V2M7 5H11V7H7C5.9 7 5 7.9 5 9V17C5 18.11 5.9 19 7 19H15C16.11 19 17 18.11 17 17V13H19V17C19 19.21 17.21 21 15 21H7C4.79 21 3 19.21 3 17V9C3 6.79 4.79 5 7 5Z"
            />
          </SvgIcon>
          <span className={classes.text}>{intl.get("add-value-object")} </span>
        </MenuItem>
        <MenuItem onClick={handleAddService}>
          <SvgIcon fontSize="small">
            <path
              fill="currentColor"
              d="M17 2H19V5H22V7H19V10H17V7H14V5H17V2M7 5H11V7H7C5.9 7 5 7.9 5 9V17C5 18.11 5.9 19 7 19H15C16.11 19 17 18.11 17 17V13H19V17C19 19.21 17.21 21 15 21H7C4.79 21 3 19.21 3 17V9C3 6.79 4.79 5 7 5Z"
            />
          </SvgIcon>
          <span className={classes.text}>{intl.get("add-service-class")} </span>
        </MenuItem>

        <Divider />
        <MenuItem onClick={handlePublish}>
          <SvgIcon fontSize="small">
            <path
              fill="currentColor"
              d="M20 13.09V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.21 7.59 21 12 21C12.46 21 12.9 21 13.33 20.94C13.12 20.33 13 19.68 13 19L13 18.95C12.68 19 12.35 19 12 19C8.13 19 6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16C12.65 16 13.27 15.96 13.88 15.89C14.93 14.16 16.83 13 19 13C19.34 13 19.67 13.04 20 13.09M18 12.45C16.7 13.4 14.42 14 12 14S7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18 9.64V12.45M12 9C8.13 9 6 7.5 6 7S8.13 5 12 5 18 6.5 18 7 15.87 9 12 9M22 18H20V22H18V18H16L19 15L22 18Z"
            />
          </SvgIcon>
          <span className={classes.text}>{intl.get("publish")} </span>
        </MenuItem>
        <MenuItem onClick={handleDownloadJson}>
          <SvgIcon fontSize="small">
            <path
              fill="currentColor"
              d="M20 13.09V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.21 7.59 21 12 21C12.46 21 12.9 21 13.33 20.94C13.12 20.33 13 19.68 13 19L13 18.95C12.68 19 12.35 19 12 19C8.13 19 6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16C12.65 16 13.27 15.96 13.88 15.89C14.93 14.16 16.83 13 19 13C19.34 13 19.67 13.04 20 13.09M18 12.45C16.7 13.4 14.42 14 12 14S7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18 9.64V12.45M12 9C8.13 9 6 7.5 6 7S8.13 5 12 5 18 6.5 18 7 15.87 9 12 9M22 20L19 23L16 20H18V16H20V20H22Z"
            />
          </SvgIcon>
          <span className={classes.text}>{intl.get("export-json")} </span>
        </MenuItem>
        <MenuItem onClick={handleExportInterface}>
          <SvgIcon fontSize="small">
            <path
              fill="currentColor"
              d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20M16 11V18.1L13.9 16L11.1 18.8L8.3 16L11.1 13.2L8.9 11H16Z"
            />
          </SvgIcon>
          <span className={classes.text}>{intl.get("export-inteface")} </span>
        </MenuItem>
      </Menu>
    </>
  );
}
