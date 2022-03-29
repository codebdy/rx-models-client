import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { EVENT_ELEMENT_SELECTED_CHANGE, triggerCanvasEvent } from "./events";

// atomFamily的effects没有实验成功，暂时用该钩子代替
export function useTriggerSelectedEvent(serviceId: number) {
  const selectedElement = useRecoilValue(selectedElementState(serviceId));

  useEffect(() => {
    triggerCanvasEvent({
      name: EVENT_ELEMENT_SELECTED_CHANGE,
      detail: selectedElement,
    });
  }, [selectedElement]);
}
