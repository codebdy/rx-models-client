export const EVENT_ELEMENT_SELECTED_CHANGE = "elementSelectedChange";
export const EVENT_PREPARE_LINK_TO = "prepareLinkTo";


export interface ICanvasEvent {
  name: string;
  data: any;
}

export function onCanvasEvent(name: string, listener: EventListener) {
  document.addEventListener(name, listener);
}

export function offCanvasEvent(name: string, listener: EventListener) {
  document.removeEventListener(name, listener);
}

export function triggerCanvasEvent(canvasEvent: ICanvasEvent) {
  const event = new CustomEvent(canvasEvent.name, { detail: canvasEvent.data });
  document.dispatchEvent(event);
}
