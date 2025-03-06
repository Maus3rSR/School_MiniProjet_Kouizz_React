import { createContext, useContext } from "react";
import { Dependencies } from "../config/dependencies";

export const DependenciesContext = createContext<Dependencies>(
  {} as Dependencies
);

// eslint-disable-next-line react-refresh/only-export-components
export function useDependencies() {
  return useContext(DependenciesContext);
}
