import { atom } from "recoil";
import { AppError } from "./AppError";

export const successAlertState = atom<boolean | string>({
  key: "successAlert",
  default: false,
});

export const appErrorState = atom<AppError | undefined>({
  key: "appError",
  default: undefined,
})