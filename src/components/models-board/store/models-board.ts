import { makeAutoObservable } from "mobx";
import { DiagramStore } from "./diagram";
import { PackageStore } from "./package";
import { Graph } from "@antv/x6";
import { createId } from "util/creat-id";
import { ColumnType } from "../meta/column-meta";
import { RootMeta } from "../meta/root-meta";
import { LinkAction } from "./link-action";
import { EVENT_INHERIT_PRESSED } from "../model-event/events";
import $bus from "../model-event/bus";
import { seedId } from "util/seed-id";
import { ClassStore } from "./class-store";
import { ColumnStore } from "./column";
import { RelationStore } from "./relation";
import { Command } from "../command/command";

export type SelectedNode = PackageStore | ClassStore | DiagramStore | ColumnStore | RelationStore | undefined;

export class ModelsBoardStore{
  rootStore: PackageStore;
  openedDiagram?: DiagramStore;
  graph?: Graph;
  isInheritPressed = false;
  drawingLink: LinkAction | undefined;
  selectedNode: SelectedNode;

  undoList: Array<Command> = [];
  redoList: Array<Command> = [];
  
  constructor(meta:RootMeta) {
    this.rootStore = new PackageStore();
    this.rootStore.initAsRoot(meta);
    makeAutoObservable(this);
  }

  setOpendDiagram(openedDiagram?: DiagramStore){
    this.openedDiagram = openedDiagram;
  }

  selectClass(id:string){
    const classStore = this.rootStore.getClassById(id);
    this.setSelectedNode(classStore);
  }

  setSelectedNode(selectedNode : SelectedNode){
    this.selectedNode = selectedNode;
  }

  setGraph(graph?:Graph){
    this.graph = graph;
  }

  setDrawingLink(drawingLink: LinkAction|undefined){
    this.drawingLink = drawingLink;
  }

  setPressInherit(isInheritPressed:boolean){
    this.isInheritPressed = isInheritPressed;
    $bus.emit(EVENT_INHERIT_PRESSED, this.isInheritPressed);
  }

  createTempClassNodeForNew(){
    const id = createId()
    return {
      id: id,
      width: 180,
      height: 80,
      shape: 'react-shape', 
      data:{
        id,
        name:'NewClass' + seedId(),
        columns: [
          {
            id: createId(),
            name: 'id',
            type: ColumnType.Number,
            primary: true,
            generated: true,
          },
        ],
        isTempForNew: true,
      }
    }
  }

  excuteCommand(command: Command){
    command.excute();
    this.undoList.push(command);
    this.redoList = [];
  }

  undo(){
    const cmd = this.undoList.pop();
    const selectedNode = cmd?.undo();
    if(cmd){
      this.redoList.push(cmd);
    }
    this.setSelectedNode(selectedNode);
  }

  redo(){
    const cmd = this.redoList.pop();
    const selectedNode = cmd?.excute();
    if(cmd){
      this.undoList.push(cmd);
    }
    this.setSelectedNode(selectedNode);
  }

}