import React, { memo, useCallback, useRef } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import intl from "react-intl-universal";
import { NodeText } from "./NodeText";
import { TreeNodeLabel } from "./TreeNodeLabel";
import { TREE_ROOT_ID } from "util/consts";
import LocalModelAction from "./LocalModelAction";
import { SvgIcon } from "@mui/material";
import { useRecoilValue } from "recoil";
import {
  diagramsState,
  selectedDiagramState,
  selectedElementState,
} from "../recoil/atoms";
import { DiagramNode } from "./DiagramNode";
import { Graph } from "@antv/x6";
import { useServiceId } from "../hooks/useServiceId";
import { Classes } from "./Classes";
import { Enums } from "./Enums";
import { ValueObjects } from "./ValueObjects";
import { Services } from "./Services";

export const ModelTreeView = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const serviceId = useServiceId();
  const selectedDiagram = useRecoilValue(selectedDiagramState(serviceId));
  const selectedElement = useRecoilValue(selectedElementState(serviceId));
  const diagrams = useRecoilValue(diagramsState(serviceId));

  const fileInputRef = useRef(null);

  const handlePackageFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const pacakgeFile = event.target.files
        ? event.target.files[0]
        : undefined;
      // if (pacakgeFile) {
      //   var reader = new FileReader();
      //   reader.readAsText(pacakgeFile, "utf-8");
      //   reader.onload = () => {
      //     if (!reader.result) {
      //       appStore.infoError(intl.get("package-file-illegal"));
      //       return;
      //     }
      //     const aPackage = JSON.parse(reader.result as string);
      //     if (!aPackage.uuid) {
      //       appStore.infoError(intl.get("package-file-illegal"));
      //       return;
      //     }

      //     if (rootStore.packages.find((apk) => apk.uuid === aPackage.uuid)) {
      //       appStore.infoError(intl.get("package-exist"));
      //       return;
      //     }
      //     const command = new PackageCreateCommand(
      //       new PackageStore(aPackage, rootStore),
      //       rootStore
      //     );
      //     rootStore.excuteCommand(command);
      //   };
      // }
    },
    []
  );

  return (
    <>
      <TreeView
        defaultCollapseIcon={
          <ExpandMoreIcon
            sx={{ color: (theme) => theme.palette.text.primary }}
          />
        }
        defaultExpanded={[TREE_ROOT_ID]}
        defaultExpandIcon={
          <ChevronRightIcon
            sx={{ color: (theme) => theme.palette.text.primary }}
          />
        }
        selected={[selectedDiagram || "", selectedElement || ""]}
        sx={{
          "& .MuiTreeItem-content": {
            padding: 0,
          },
        }}
      >
        <TreeItem
          nodeId={TREE_ROOT_ID}
          label={
            <TreeNodeLabel
              action={
                <LocalModelAction
                  onPublish={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  onDownloadJson={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  onExportInterface={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              }
            >
              <SvgIcon>
                <path
                  fill="currentColor"
                  d="M20 6H12L10 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V8A2 2 0 0 0 20 6M20 18H4V8H20M13 17V14H15V17H17V13H19L14 9L9 13H11V17Z"
                />
              </SvgIcon>
              <NodeText>{intl.get("local-models")}</NodeText>
            </TreeNodeLabel>
          }
        >
          {diagrams.map((diagram) => {
            return <DiagramNode key={diagram.uuid} diagram={diagram} />;
          })}
          <Classes graph={graph} />
          <Enums graph={graph} />
          <ValueObjects graph={graph} />
          <Services graph={graph} />
        </TreeItem>
        <TreeItem
          nodeId={TREE_ROOT_ID + 1}
          label={
            <TreeNodeLabel>
              <SvgIcon>
                <path
                  fill="currentColor"
                  d="M4.93,3.93C3.12,5.74 2,8.24 2,11C2,13.76 3.12,16.26 4.93,18.07L6.34,16.66C4.89,15.22 4,13.22 4,11C4,8.79 4.89,6.78 6.34,5.34L4.93,3.93M19.07,3.93L17.66,5.34C19.11,6.78 20,8.79 20,11C20,13.22 19.11,15.22 17.66,16.66L19.07,18.07C20.88,16.26 22,13.76 22,11C22,8.24 20.88,5.74 19.07,3.93M7.76,6.76C6.67,7.85 6,9.35 6,11C6,12.65 6.67,14.15 7.76,15.24L9.17,13.83C8.45,13.11 8,12.11 8,11C8,9.89 8.45,8.89 9.17,8.17L7.76,6.76M16.24,6.76L14.83,8.17C15.55,8.89 16,9.89 16,11C16,12.11 15.55,13.11 14.83,13.83L16.24,15.24C17.33,14.15 18,12.65 18,11C18,9.35 17.33,7.85 16.24,6.76M12,9A2,2 0 0,0 10,11A2,2 0 0,0 12,13A2,2 0 0,0 14,11A2,2 0 0,0 12,9M11,15V19H10A1,1 0 0,0 9,20H2V22H9A1,1 0 0,0 10,23H14A1,1 0 0,0 15,22H22V20H15A1,1 0 0,0 14,19H13V15H11Z"
                />
              </SvgIcon>
              <NodeText>{"用户服务"}</NodeText>
            </TreeNodeLabel>
          }
        ></TreeItem>
        <TreeItem
          nodeId={TREE_ROOT_ID + 2}
          label={
            <TreeNodeLabel>
              <SvgIcon>
                <path
                  fill="currentColor"
                  d="M4.93,3.93C3.12,5.74 2,8.24 2,11C2,13.76 3.12,16.26 4.93,18.07L6.34,16.66C4.89,15.22 4,13.22 4,11C4,8.79 4.89,6.78 6.34,5.34L4.93,3.93M19.07,3.93L17.66,5.34C19.11,6.78 20,8.79 20,11C20,13.22 19.11,15.22 17.66,16.66L19.07,18.07C20.88,16.26 22,13.76 22,11C22,8.24 20.88,5.74 19.07,3.93M7.76,6.76C6.67,7.85 6,9.35 6,11C6,12.65 6.67,14.15 7.76,15.24L9.17,13.83C8.45,13.11 8,12.11 8,11C8,9.89 8.45,8.89 9.17,8.17L7.76,6.76M16.24,6.76L14.83,8.17C15.55,8.89 16,9.89 16,11C16,12.11 15.55,13.11 14.83,13.83L16.24,15.24C17.33,14.15 18,12.65 18,11C18,9.35 17.33,7.85 16.24,6.76M12,9A2,2 0 0,0 10,11A2,2 0 0,0 12,13A2,2 0 0,0 14,11A2,2 0 0,0 12,9M11,15V19H10A1,1 0 0,0 9,20H2V22H9A1,1 0 0,0 10,23H14A1,1 0 0,0 15,22H22V20H15A1,1 0 0,0 14,19H13V15H11Z"
                />
              </SvgIcon>
              <NodeText>{"邮件管理"}</NodeText>
            </TreeNodeLabel>
          }
        ></TreeItem>
      </TreeView>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: "none" }}
        onChange={handlePackageFileInputChange}
      />
    </>
  );
});
