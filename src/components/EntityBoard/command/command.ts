import { SelectedNode } from "../store/entity-board-store";

export interface Command{
  //返回selectedNode
  excute: () => SelectedNode;
  //返回selectedNode
  undo: () => SelectedNode;
}