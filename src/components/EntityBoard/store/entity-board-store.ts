import { makeAutoObservable } from "mobx";
import { DiagramStore } from "./diagram";
import { PackageStore } from "./package";
import { Graph } from "@antv/x6";
import { LineAction } from "../recoil/line-action";
import { EntityStore } from "./entity-store";
import { ColumnStore } from "./column";
import { RelationStore } from "./relation";
import { Command } from "../command/command";
import { NODE_INIT_SIZE } from "./node-init-size";
import { RelationType } from "../meta/relation-meta";
import _ from 'lodash';
import { PackageMeta } from "../meta/package-meta";
import { EntityType } from "../meta/entity-meta";

export type SelectedNode = PackageStore | EntityStore | DiagramStore | ColumnStore | RelationStore | undefined;

export class EntityBoardStore{
  /**
   * 是否有修改，用于未保存提示
   */
  changed = false;

  /**
   * 所有的包
   */
  packages: PackageStore[];

  /**
   * 当前正在打开的 ER 图
   */
  openedDiagram?: DiagramStore;

  /**
   * 当前使用的 X6 Graph对象
   */
  graph?: Graph;

  /**
   * 工具条上的关系被按下，记录具体类型
   */
  pressedLineType?: RelationType;

  /**
   * 处在鼠标拖动划线的状态
   */
  drawingLine: LineAction | undefined;

  /**
   * 被选中的节点
   */
  selectedElement: SelectedNode;

  /**
   * Command 模式，撤销列表
   */
  undoList: Array<Command> = [];

  /**
   * Command 模式，重做列表
   */
  redoList: Array<Command> = [];
  
  /**
   * 构造函数传入包元数据，会自动解析成一棵 Mobx Observable 树
   */
  constructor(packageMetas:PackageMeta[]) {
    this.packages = packageMetas.map(packageMeta=> new PackageStore(packageMeta,this));
    makeAutoObservable(this);
  }

  setChanged(changed:boolean){
    this.changed = changed;
  }

  setOpendDiagram(openedDiagram?: DiagramStore){
    this.openedDiagram = openedDiagram;
  }

  selectEntity(uuid:string){
    const entityStore = this.getEntityById(uuid);
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
    //const entityMeta = creatNewEntityMeta(this)
    return {
      uuid: 'entityMeta.uuid',
      ...NODE_INIT_SIZE,
      shape: 'react-shape', 
      data:{
        //...entityMeta,
        isTempForNew: true,
      }
    }
  }

  getPackgeById(uuid:string|undefined){
    return this.packages.find(aPackage => aPackage.uuid === uuid);
  }

  getPackageByName(name: string){
    return this.packages.find(aPackage => aPackage.name === name);
  }

  addPackge(packageStore: PackageStore){
    this.packages.push(packageStore);
  }

  insertPackage(packageStore: PackageStore, index:number){
    this.packages.splice(index, 0, packageStore);
  }

  deletePackage(uuid:string){
    _.remove(this.packages, (packageStore)=> packageStore.uuid === uuid);
  }

  getRelationById(uuid:string){
    for(const pkg of this.packages){
      const relationStore = pkg.getRelationById(uuid);
      if(relationStore){
        return relationStore;
      }
    }
  }

  getEntityByName(name:string): EntityStore|undefined{
    for(const pkg of this.packages){
      const entityStore = pkg.getEntityByName(name);
      if(entityStore){
        return entityStore;
      }
    }
  }  

  getEntityById(uuid: string|undefined):EntityStore|undefined{
    if(!uuid){
      return undefined;
    }

    for(const aPackage of this.packages){
      const entityStore = aPackage.getEntityById(uuid);
      if(entityStore){
        return entityStore;
      }
    }
  }

  getDiagrams(): DiagramStore[]{
    const diagrams:DiagramStore[] = [];
    for(const pkg of this.packages){
      diagrams.push(...pkg.diagrams);
    }
    return diagrams;
  }


  getDiagramByName(name:string): DiagramStore|undefined{
    for(const pkg of this.packages){
      const diagStore = pkg.getDiagramByName(name);
      if(diagStore){
        return diagStore;
      }
    }
    return undefined;
  }

  getDiagramById(id:string): DiagramStore|undefined{
    for(const pkg of this.packages){
      const diagStore = pkg.getDiagramById(id);
      if(diagStore){
        return diagStore;
      }
    }
    return undefined;
  }

  getRelations(){
    const relations = [];
    for(const pkg of this.packages){
      relations.push(...pkg.relations)
    }

    return relations;
  }

  excuteCommand(command: Command){
    this.changed = true;
    const node = command.excute();
    this.undoList.push(command);
    this.redoList = [];
    this.setSelectedElement(node);
  }

  undo(){
    this.changed = true;
    const cmd = this.undoList.pop();
    const selectedNode = cmd?.undo();
    if(cmd){
      this.redoList.push(cmd);
    }
    this.setSelectedElement(selectedNode);
  }

  redo(){
    this.changed = true;
    const cmd = this.redoList.pop();
    const selectedNode = cmd?.excute();
    if(cmd){
      this.undoList.push(cmd);
    }
    this.setSelectedElement(selectedNode);
  }

  getPackeMetas(){
    return this.packages.map(packageStore=>packageStore.toMeta());
  }

  getEnumEntities(){
    const enums = [];
    for(const aPackage of this.packages){
      enums.push(...aPackage.entities.filter(entity=>entity.entityType === EntityType.ENUM))
    }

    return enums;
  }

  getInterfaceEntities(){
    const interfaces = [];
    for(const aPackage of this.packages){
      interfaces.push(...aPackage.entities.filter(entity=>entity.entityType === EntityType.INTERFACE))
    }

    return interfaces;
  }
}