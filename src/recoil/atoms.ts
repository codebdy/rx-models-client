import { atom } from "recoil";
import { AppError } from "./AppError";

export const themeModeState = atom<"light"|"dark">({
  key: "themeMode",
  default: "dark",
})

export const successAlertState = atom<boolean | string>({
  key: "successAlert",
  default: false,
});

export const appErrorState = atom<AppError | undefined>({
  key: "appError",
  default: undefined,
})