import { EntityMeta } from "../meta/EntityMeta";


export type EntityNodeData = EntityMeta & {
  packageName?: string;
  isTempForNew?: boolean;
  isTempForDrag?: boolean;
  selectedId?: string;
  isPressedRelation?: boolean;
};
