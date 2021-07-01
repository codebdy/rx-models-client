import { makeAutoObservable } from "mobx";

export class AppError {
  message?: string;
  details?: string;
  constructor() {
    makeAutoObservable(this);
  }
}
