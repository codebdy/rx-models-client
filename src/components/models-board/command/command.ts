import { SelectedNode } from "../store/models-board";

export interface Command{
  //返回selectedNode
  excute: () => SelectedNode;
  //返回selectedNode
  undo: () => SelectedNode;
}