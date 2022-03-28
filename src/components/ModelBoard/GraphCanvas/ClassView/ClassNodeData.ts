import { ClassMeta } from "components/ModelBoard/meta/ClassMeta"
import { RelationType } from "components/ModelBoard/meta/RelationMeta";
import { X6NodeMeta } from "components/ModelBoard/meta/X6NodeMeta"

export type ClassNodeData = X6NodeMeta & ClassMeta &{
  serviceName?: string;
  isTempForNew?: boolean;
  isTempForDrag?: boolean;
  selectedId?: string,
  pressedLineType?: RelationType,
  themeMode: "dark"|"light"
}