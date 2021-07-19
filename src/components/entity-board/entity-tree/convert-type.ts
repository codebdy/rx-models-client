import { ColumnType } from "../meta/column-meta";

export function convertType(type: ColumnType): string {
  if (type === ColumnType.String || type === ColumnType.Enum) {
    return 'string';
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

  if (type === ColumnType.SimpleJson) {
    return 'any';
  }

  if (type === ColumnType.SimpleArray) {
    return 'any[]';
  }
  return ''
}
