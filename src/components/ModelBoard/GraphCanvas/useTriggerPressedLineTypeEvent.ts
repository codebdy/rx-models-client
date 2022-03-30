import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { pressedLineTypeState } from "../recoil/atoms";
import { EVENT_PRESSED_LINE_TYPE, triggerCanvasEvent } from "./events";

// atomFamily的effects没有实验成功，暂时用该钩子代替
export function useTriggerPressedLineTypeEvent(serviceId: number) {
  const pressedLineType = useRecoilValue(pressedLineTypeState(serviceId));

  useEffect(() => {
    triggerCanvasEvent({
      name: EVENT_PRESSED_LINE_TYPE,
      detail: pressedLineType,
    });
  }, [pressedLineType]);
}
