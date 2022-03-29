export const EVENT_ELEMENT_SELECTED = "elementSelected";
export const EVENT_ELEMENT_UNSELECTED = "elementUnselected";
export const EVENT_LINE_PRESSED = "linePressed";
export const EVENT_LINE_DRAWING = "lineDrawing";
export const EVENT_PREPARE_LINK_TO = "prepareLinkTo";


export interface ICanvasEvent {
  name: string;
}

export function onCanvasEvent(name: string, listener: EventListener) {
  document.addEventListener(name, listener);
}

export function offCanvasEvent(name: string, listener: EventListener) {
  document.removeEventListener(name, listener);
}

export function triggerCanvasEvent(canvasEvent: ICanvasEvent) {
  const event = new CustomEvent(canvasEvent.name, { detail: canvasEvent });
  document.dispatchEvent(event);
}
