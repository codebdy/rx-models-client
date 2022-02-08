import { atom } from "recoil";

export const successAlertState = atom<boolean | string>({
  key: "successAlert",
  default: false,
});
