import { ClassMeta } from "components/ModelBoard/meta/ClassMeta"
import { X6NodeMeta } from "components/ModelBoard/meta/X6NodeMeta"

export type EntityNodeData = X6NodeMeta & ClassMeta &{
  serviceName?: string;
  isTempForNew?: boolean;
  isTempForDrag?: boolean;
  selectedId?: string,
  isPressedRelation?: boolean,
  themeMode: "dark"|"light"
}