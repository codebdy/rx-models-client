import { createContext, useContext } from "react";
import { ModelsBoardStore } from "./models-board";

export const ModelContext = createContext<ModelsBoardStore>({} as ModelsBoardStore);
export const ModelStoreProvider = ModelContext.Provider;

export const useModelsBoardStore = (): ModelsBoardStore => useContext(ModelContext);