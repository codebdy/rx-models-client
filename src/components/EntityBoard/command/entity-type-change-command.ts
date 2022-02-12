import { SelectedNode } from "../store/entity-board-store";
import { Command } from "./command";
import { EntityStore } from "../store/entity-store";
import { EntityType } from "../meta/EntityMeta";
import { ColumnStore } from "../store/column";
import { createId } from "util/createId";
import { ColumnType } from "../meta/ColumnMeta";

export class EntityTypeChangeCommand implements Command{
  private oldType: EntityType|undefined|"";
  private oldColumns: ColumnStore[];
  private newClumns: ColumnStore[];
  constructor(
    private readonly entityStore: EntityStore,
    private readonly newtype: EntityType,
  ){
    this.oldType = entityStore.entityType;
    this.oldColumns = entityStore.columns;
    this.newClumns = [];
    if(this.newtype === EntityType.ENUM || this.newtype === EntityType.INTERFACE){
      this.newClumns = [];
    }
    else if(this.oldType === EntityType.ENUM || this.oldType === EntityType.INTERFACE){
      this.newClumns = [new ColumnStore(
        {
          uuid: createId(),
          name: 'id',
          type: ColumnType.Number,
          primary: true,
          generated: true,
        }, this.entityStore),
      ];
    }else{
      this.newClumns = entityStore.columns;
    }
  }
  
  excute():SelectedNode{
    this.entityStore.setType(this.newtype);
    this.entityStore.setColumns(this.newClumns);
    return this.entityStore;
  }
  undo():SelectedNode{
    this.entityStore.setType(this.oldType);
    this.entityStore.setColumns(this.oldColumns);
    return this.entityStore;
  };
}