import React, { useRef } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import intl from "react-intl-universal";
import { NodeText } from "./node-text";
import { TreeNodeLabel } from "./tree-node-label";
import { useEntityBoardStore } from "../store/helper";
import { PackageNode } from "./package-node";
import { PackageCreateCommand } from "../command/package-create-command";
import { createId } from "util/creat-id";
import { getNewPackageName } from "../store/get-new-package-name";
import { PackageStore } from "../store/package";
import { TREE_ROOT_ID } from "util/consts";
import RootAction from "./root-action";
import { PackageStatus } from "../meta/package-meta";
import { useAppStore } from "store/app-store";
import { SvgIcon } from "@mui/material";

export const EntityTreeView = () => {
  const rootStore = useEntityBoardStore();
  const fileInputRef = useRef(null);
  const appStore = useAppStore();

  const handleAddPackage = () => {
    const command = new PackageCreateCommand(
      new PackageStore(
        {
          uuid: createId(),
          name: getNewPackageName(rootStore),
          status: PackageStatus.EDITING,
        },
        rootStore
      ),
      rootStore
    );
    rootStore.excuteCommand(command);
  };

  const handleImportPackage = () => {
    if (fileInputRef.current) {
      (fileInputRef.current as any)?.click();
    }
  };

  const handlePackageFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pacakgeFile = event.target.files ? event.target.files[0] : undefined;
    if (pacakgeFile) {
      var reader = new FileReader();
      reader.readAsText(pacakgeFile, "utf-8");
      reader.onload = () => {
        if (!reader.result) {
          appStore.infoError(intl.get("package-file-illegal"));
          return;
        }
        const aPackage = JSON.parse(reader.result as string);
        if (!aPackage.uuid) {
          appStore.infoError(intl.get("package-file-illegal"));
          return;
        }

        if (rootStore.packages.find((apk) => apk.uuid === aPackage.uuid)) {
          appStore.infoError(intl.get("package-exist"));
          return;
        }
        const command = new PackageCreateCommand(
          new PackageStore(aPackage, rootStore),
          rootStore
        );
        rootStore.excuteCommand(command);
      };
    }
  };

  return (
    <>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={[TREE_ROOT_ID]}
        defaultExpandIcon={<ChevronRightIcon />}
        selected={[
          rootStore?.selectedElement?.uuid || "",
          rootStore?.openedDiagram?.uuid || "",
        ]}
      >
        <TreeItem
          nodeId={TREE_ROOT_ID}
          label={
            <TreeNodeLabel
              action={
                <RootAction
                  onAddPackage={handleAddPackage}
                  onImportPackage={handleImportPackage}
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
          sx={{
            "& .MuiTreeItem-content": {
              padding: 0,
            },
          }}
        >
          {rootStore.packages.map((aPackage) => {
            return <PackageNode key={aPackage.uuid} packageStore={aPackage} />;
          })}
        </TreeItem>
        <TreeItem
          nodeId={TREE_ROOT_ID + 1}
          label={
            <TreeNodeLabel
              action={
                <RootAction
                  onAddPackage={handleAddPackage}
                  onImportPackage={handleImportPackage}
                />
              }
            >
              <SvgIcon>
                <path
                  fill="currentColor"
                  d="M15 20C15 19.45 14.55 19 14 19H13V17H19C20.11 17 21 16.11 21 15V7C21 5.9 20.11 5 19 5H13L11 3H5C3.9 3 3 3.9 3 5V15C3 16.11 3.9 17 5 17H11V19H10C9.45 19 9 19.45 9 20H2V22H9C9 22.55 9.45 23 10 23H14C14.55 23 15 22.55 15 22H22V20H15M5 15V7H19V15H5Z"
                />
              </SvgIcon>
              <NodeText>{"用户服务"}</NodeText>
            </TreeNodeLabel>
          }
          sx={{
            "& .MuiTreeItem-content": {
              padding: 0,
            },
          }}
        >
          {rootStore.packages.map((aPackage) => {
            return <PackageNode key={aPackage.uuid} packageStore={aPackage} />;
          })}
        </TreeItem>
        <TreeItem
          nodeId={TREE_ROOT_ID + 2}
          label={
            <TreeNodeLabel
              action={
                <RootAction
                  onAddPackage={handleAddPackage}
                  onImportPackage={handleImportPackage}
                />
              }
            >
              <SvgIcon>
                <path
                  fill="currentColor"
                  d="M15 20C15 19.45 14.55 19 14 19H13V17H19C20.11 17 21 16.11 21 15V7C21 5.9 20.11 5 19 5H13L11 3H5C3.9 3 3 3.9 3 5V15C3 16.11 3.9 17 5 17H11V19H10C9.45 19 9 19.45 9 20H2V22H9C9 22.55 9.45 23 10 23H14C14.55 23 15 22.55 15 22H22V20H15M5 15V7H19V15H5Z"
                />
              </SvgIcon>
              <NodeText>{"邮件管理"}</NodeText>
            </TreeNodeLabel>
          }
          sx={{
            "& .MuiTreeItem-content": {
              padding: 0,
            },
          }}
        >
          {rootStore.packages.map((aPackage) => {
            return <PackageNode key={aPackage.uuid} packageStore={aPackage} />;
          })}
        </TreeItem>
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
};
