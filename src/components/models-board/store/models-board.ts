import { makeAutoObservable } from "mobx";
import { DiagramStore } from "./diagram";
import { PackageStore } from "./package";
import { Graph } from "@antv/x6";
import { RootMeta } from "../meta/root-meta";
import { LineAction } from "./line-action";
import { EntityStore } from "./entity-store";
import { ColumnStore } from "./column";
import { RelationStore } from "./relation";
import { Command } from "../command/command";
import { NODE_INIT_SIZE } from "./node-init-size";
import { RelationType } from "../meta/relation-meta";
import { creatNewEntityMeta } from "./create-new-entity-meta";

export type SelectedNode = PackageStore | EntityStore | DiagramStore | ColumnStore | RelationStore | undefined;

export class ModelsBoardStore{
  rootStore: PackageStore;
  openedDiagram?: DiagramStore;
  graph?: Graph;
  pressedLineType?: RelationType;
  drawingLine: LineAction | undefined;
  selectedElement: SelectedNode;

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
    const entityStore = this.rootStore.getEntityById(id);
    this.setSelectedElement(entityStore);
  }

  setSelectedElement(selectedElement : SelectedNode){
    this.selectedElement = selectedElement;
  }

  setGraph(graph?:Graph){
    this.graph = graph;
  }

  setDrawingLine(drawingLine: LineAction|undefined){
    this.drawingLine = drawingLine;
  }

  setPressRelation(pressedLineType?:RelationType){
    this.pressedLineType = pressedLineType;
  }

  createTempClassNodeForNew(){
    const entityMeta = creatNewEntityMeta(this.rootStore)
    return {
      id: entityMeta.id,
      ...NODE_INIT_SIZE,
      shape: 'react-shape', 
      data:{
        ...entityMeta,
        isTempForNew: true,
      }
    }
  }

  excuteCommand(command: Command){
    const node = command.excute();
    this.undoList.push(command);
    this.redoList = [];
    this.setSelectedElement(node);
  }

  undo(){
    const cmd = this.undoList.pop();
    const selectedNode = cmd?.undo();
    if(cmd){
      this.redoList.push(cmd);
    }
    this.setSelectedElement(selectedNode);
  }

  redo(){
    const cmd = this.redoList.pop();
    const selectedNode = cmd?.excute();
    if(cmd){
      this.undoList.push(cmd);
    }
    this.setSelectedElement(selectedNode);
  }

}