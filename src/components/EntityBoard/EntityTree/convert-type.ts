import { AttributeMeta, AttributeType } from "../meta/AttributeMeta";
import { ClassMeta } from "../meta/ClassMeta";

export function convertType(
  column: AttributeMeta,
  enumEntities: ClassMeta[],
  interfaceEntities: ClassMeta[]
): string {
  const type = column.type;
  if (type === AttributeType.String) {
    return "string";
  }

  if (type === AttributeType.Enum) {
    return (
      enumEntities.find((entitiy) => entitiy.uuid === column.enumUuid)
        ?.name || "string"
    );
  }

  if (type === AttributeType.SimpleJson) {
    return (
      interfaceEntities.find((entitiy) => entitiy.uuid === column.enumUuid)
        ?.name || "any"
    );
  }

  if (type === AttributeType.SimpleArray) {
    return "any[]";
  }

  if (type === AttributeType.JsonArray) {
    return (
      (interfaceEntities.find(
        (entitiy) => entitiy.uuid === column.enumUuid
      )?.name || "any") + "[]"
    );
  }

  if (type === AttributeType.Boolean) {
    return "boolean";
  }

  if (type === AttributeType.Int) {
    return "number";
  }

  if (type === AttributeType.Date) {
    return "Date";
  }

  return "";
}
