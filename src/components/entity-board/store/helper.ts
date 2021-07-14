import { createContext, useContext } from "react";
import { EntityBoardStore } from "./entity-board-store";

export const EnityContext = createContext<EntityBoardStore>({} as EntityBoardStore);
export const EntityStoreProvider = EnityContext.Provider;

export const useEntityBoardStore = (): EntityBoardStore => useContext(EnityContext);