import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { RelationType } from "../meta/RelationMeta";

export function canStartLink(lineType: RelationType, classMeta: ClassMeta) {
  return (
    (lineType &&
      classMeta.stereoType !== StereoType.Enum &&
      classMeta.stereoType !== StereoType.ValueObject &&
      classMeta.stereoType !== StereoType.Service) 
  );
}
