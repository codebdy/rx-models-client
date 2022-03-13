import { ColumnMeta, ColumnType } from "../meta/ColumnMeta";
import { EntityMeta } from "../meta/EntityMeta";

export function convertType(
  column: ColumnMeta,
  enumEntities: EntityMeta[],
  interfaceEntities: EntityMeta[]
): string {
  const type = column.type;
  if (type === ColumnType.String) {
    return "string";
  }

  if (type === ColumnType.Enum) {
    return (
      enumEntities.find((entitiy) => entitiy.uuid === column.typeEnityUuid)
        ?.name || "string"
    );
  }

  if (type === ColumnType.SimpleJson) {
    return (
      interfaceEntities.find((entitiy) => entitiy.uuid === column.typeEnityUuid)
        ?.name || "any"
    );
  }

  if (type === ColumnType.SimpleArray) {
    return "any[]";
  }

  if (type === ColumnType.JsonArray) {
    return (
      (interfaceEntities.find(
        (entitiy) => entitiy.uuid === column.typeEnityUuid
      )?.name || "any") + "[]"
    );
  }

  if (type === ColumnType.Boolean) {
    return "boolean";
  }

  if (type === ColumnType.Number) {
    return "number";
  }

  if (type === ColumnType.Date) {
    return "Date";
  }

  return "";
}
