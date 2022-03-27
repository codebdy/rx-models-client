import { EntityMeta } from "components/EntityBoard/meta/EntityMeta"
import { X6NodeMeta } from "components/EntityBoard/meta/X6NodeMeta"

export type EntityNodeData = X6NodeMeta & EntityMeta &{
  serviceName?: string;
  isTempForNew?: boolean;
  isTempForDrag?: boolean;
  selectedId?: string,
  isPressedRelation?: boolean,
  themeMode: "dark"|"light"
}