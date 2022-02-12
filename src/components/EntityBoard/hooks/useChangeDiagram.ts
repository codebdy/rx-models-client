import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { DiagramMeta } from "../meta/DiagramMeta";
import { diagramsState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useChangeDiagram() {
  const backupSnapshot = useBackupSnapshot();
  const setDiagrams = useSetRecoilState(diagramsState);

  const changeDiagram = useCallback(
    (diagram: DiagramMeta) => {
      backupSnapshot();

      setDiagrams((diagrams) =>
        diagrams.map((dm) => (dm.uuid === diagram.uuid ? diagram : dm))
      );
    },
    [backupSnapshot, setDiagrams]
  );

  return changeDiagram;
}
