import { ClassMeta } from "../meta/class-meta";
import { X6NodeMeta } from "../meta/x6-node-meta";
import { DiagramStore } from "../store/diagram";
import { SelectedNode } from "../store/models-board";
import { Command } from "./command";

export class CreateClassCommand implements Command{
  constructor(
    private readonly diagramStore: DiagramStore,
    private readonly classMeta: ClassMeta,
    private readonly nodeMeta: X6NodeMeta,
  ){}
  
  excute():SelectedNode{
    const classStore = this.diagramStore?.belongsToPackage?.addNewClass(this.classMeta);
    this.diagramStore?.addNode(this.nodeMeta);
    return classStore;
  }
  undo():SelectedNode{
    this.diagramStore?.belongsToPackage?.deleteClass(this.classMeta.id)
    this.diagramStore?.deleteNode(this.nodeMeta.id);
    return undefined;
  };
}