import { EntityMeta } from "../meta/entity-meta";


export type EntityNodeData = EntityMeta & {
  packageName?: string;
  isTempForNew?: boolean;
  isTempForDrag?: boolean;
  selectedId?: string;
  isPressedRelation?: boolean;
};
