import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { RelationType } from "../meta/RelationMeta";

export function canStartLink(lineType: RelationType, classMeta: ClassMeta) {
  if (
    lineType &&
    classMeta.stereoType !== StereoType.Enum &&
    classMeta.stereoType !== StereoType.ValueObject &&
    classMeta.stereoType !== StereoType.Service
  ) {
    return true;
  } else if (classMeta.stereoType === StereoType.ValueObject) {
    if (
      lineType === RelationType.ONE_WAY_AGGREGATION ||
      lineType === RelationType.ONE_WAY_ASSOCIATION ||
      lineType === RelationType.ONE_WAY_COMBINATION
    ) {
      return true;
    }
  }
  return false;
}
