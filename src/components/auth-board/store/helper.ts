import { createContext, useContext } from "react";
import { AuthBoardStore } from "./auth-board-store";

export const AuthContext = createContext<AuthBoardStore>({} as AuthBoardStore);
export const AuthStoreProvider = AuthContext.Provider;

export const useAuthBoardStore = (): AuthBoardStore => useContext(AuthContext);