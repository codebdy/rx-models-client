import { ColumnType } from "../meta/column-meta";
import { ColumnStore } from "../store/column";
import { EntityStore } from "../store/entity-store";

export function convertType(column: ColumnStore, enumEntities:EntityStore[], interfaceEntities: EntityStore[]): string {
  const type = column.type;
  if (type === ColumnType.String) {
    return 'string';
  }

  if(type === ColumnType.Enum) {
    return enumEntities.find(entitiy => entitiy.uuid === column.typeEnityUuid)?.name||'string';
  }

  if(type === ColumnType.SimpleJson) {
    return interfaceEntities.find(entitiy => entitiy.uuid === column.typeEnityUuid)?.name||'any';
  }

  if (type === ColumnType.Boolean) {
    return 'boolean';
  }

  if (type === ColumnType.Number) {
    return 'number';
  }

  if (type === ColumnType.Date) {
    return 'Date';
  }

  if (type === ColumnType.SimpleArray) {
    return 'any[]';
  }
  return ''
}
