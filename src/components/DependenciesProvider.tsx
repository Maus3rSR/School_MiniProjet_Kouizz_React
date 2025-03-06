import { createContext, useContext } from "react";
import { Dependencies } from "../config/dependencies";

const DependenciesContext = createContext<Dependencies>({} as Dependencies);

export function useDependencies() {
  return useContext(DependenciesContext);
}

export default function DependenciesProvider({
  children,
  services,
}: {
  children: React.ReactNode;
  services: Dependencies;
}) {
  return (
    <DependenciesContext.Provider value={services}>
      {children}
    </DependenciesContext.Provider>
  );
}
