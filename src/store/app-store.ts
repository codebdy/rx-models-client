import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { Confirm } from "./confirm";
import { User } from "./helpers/logged-user";

export class AppStore{
  showThemeSettings = false;
  toolbarElevate = true;
  token:string = "";
  loggedUser: User|undefined = undefined;
  successAlert: boolean|string = false;
  confirm: Confirm = new Confirm();

  constructor() {
    makeAutoObservable(this)
  }

  setToolbarElevate(show:boolean){
    this.toolbarElevate = show;
  }

  openShowThemeSettings(){
    this.showThemeSettings = true
  }

  closeShowThemeSettings(){
    this.showThemeSettings = false
  }

  setToken(token:string){
    this.token = token;
  }

  setLoggedUser(user:User|undefined){
    this.loggedUser = user;
  }

  showSuccessAlert(alert:boolean|string = true){
    this.successAlert = alert;
  }

  confirmAction(message:string, actionCallback:()=>void){
    this.confirm.open(message, actionCallback);
  }
}

export const AppContext = createContext<AppStore>({} as AppStore);
export const AppStoreProvider = AppContext.Provider;

export const useAppStore = (): AppStore => useContext(AppContext);