import { SelectedNode } from "../store/entity-board-store";
import { Command } from "./command";
import { EntityStore } from "../store/entity-store";
import { EntityType } from "../meta/entity-meta";
import { ColumnStore } from "../store/column";
import { createId } from "util/creat-id";
import { ColumnType } from "../meta/column-meta";

export class EntityTypeChangeCommand implements Command{
  private oldType: EntityType|undefined|"";
  private oldColumns: ColumnStore[];
  constructor(
    private readonly entityStore: EntityStore,
    private readonly newtype: EntityType,
  ){
    this.oldType = entityStore.entityType;
    this.oldColumns = entityStore.columns;
  }
  
  excute():SelectedNode{
    this.entityStore.setType(this.newtype);
    if(this.newtype === EntityType.ENUM){
      this.entityStore.setColumns([]);
    }
    else{
      this.entityStore.setColumns([new ColumnStore(
        {
          uuid: createId(),
          name: 'id',
          type: ColumnType.Number,
          primary: true,
          generated: true,
        }, this.entityStore)
      ])
    }
    return this.entityStore;
  }
  undo():SelectedNode{
    this.entityStore.setType(this.oldType);
    this.entityStore.setColumns(this.oldColumns);
    return this.entityStore;
  };
}