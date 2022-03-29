import { ClassMeta } from "components/ModelBoard/meta/ClassMeta"
import { RelationType } from "components/ModelBoard/meta/RelationMeta";
import { X6NodeMeta } from "components/ModelBoard/meta/X6NodeMeta"
import { LineAction } from "components/ModelBoard/recoil/LineAction";

export type ClassNodeData = X6NodeMeta & ClassMeta &{
  serviceName?: string;
  // selectedId?: string,
  pressedLineType?: RelationType,
  drawingLine:LineAction|undefined,
  themeMode: "dark"|"light"
}