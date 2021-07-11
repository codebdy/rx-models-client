import { createContext, useContext } from "react";
import { EntityBoardStore } from "./entity-board";

export const ModelContext = createContext<EntityBoardStore>({} as EntityBoardStore);
export const ModelStoreProvider = ModelContext.Provider;

export const useModelsBoardStore = (): EntityBoardStore => useContext(ModelContext);