import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import { reducer } from "./reducer";
// Importamos as interfaces que você já tem prontas
import type { AppState, ContextProps } from "../interfaces/Context";

// Inicializamos o contexto com a tipagem correta
export const Context = createContext<ContextProps>({} as ContextProps);

export const useAppContext = () => useContext(Context);

interface AppContextProviderProps {
  children: ReactNode;
  initialState: AppState;
}

export const AppContext = ({ children, initialState }: AppContextProviderProps) => {
  // O useReducer agora entende que 'state' é do tipo AppState
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};