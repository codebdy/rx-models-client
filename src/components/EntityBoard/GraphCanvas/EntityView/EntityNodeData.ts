import { ClassMeta } from "components/EntityBoard/meta/ClassMeta"
import { X6NodeMeta } from "components/EntityBoard/meta/X6NodeMeta"

export type EntityNodeData = X6NodeMeta & ClassMeta &{
  serviceName?: string;
  isTempForNew?: boolean;
  isTempForDrag?: boolean;
  selectedId?: string,
  isPressedRelation?: boolean,
  themeMode: "dark"|"light"
}