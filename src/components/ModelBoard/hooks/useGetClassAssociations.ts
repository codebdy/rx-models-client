import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { RelationMeta } from "../meta/RelationMeta";
import { relationsState } from "../recoil/atoms";

export interface Association {
  name: string ;
  relation: RelationMeta;
}

export function useGetClassAssociations(serviceId: number) {
  const relations = useRecoilValue(relationsState(serviceId));

  const getClassAssociations = useCallback(
    (classUuid: string) => {
      const associations: Association[] = [];
      for (const relation of relations) {
        if (relation.sourceId === classUuid) {
          associations.push({ name: relation.roleOfTarget||"", relation });
        }else if(relation.targetId === classUuid){
          associations.push({ name: relation.roleOfSource||"", relation });
        }
      }
      return associations;
    },
    [relations]
  );

  return getClassAssociations;
}
