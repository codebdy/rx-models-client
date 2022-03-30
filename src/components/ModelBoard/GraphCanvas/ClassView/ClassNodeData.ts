import { ClassMeta } from "components/ModelBoard/meta/ClassMeta"
import { X6NodeMeta } from "components/ModelBoard/meta/X6NodeMeta"

export type ClassNodeData = X6NodeMeta & ClassMeta &{
  serviceName?: string;
  // selectedId?: string,
  //pressedLineType?: RelationType,
  //drawingLine:LineAction|undefined,
  themeMode: "dark"|"light"
}