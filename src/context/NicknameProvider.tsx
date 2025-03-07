import { createContext, useContext } from "react";

// Création d'un contexte avec createContext
export const NicknameContext = createContext<{
  nickName: string;
  updateNickName: (nickName: string) => void;
}>({
  nickName: "",
  updateNickName: () => { },
});

// C'est un hook personnalisé, qui me sert de raccourci pour éviter
// de devoir uiliser à chaque useContext + NicknameContexte à importer à l'utilisation
export const useNickname = () => {
  // useContext est un hook permettant de récupérer un contexte comportant
  // des données que l'on souhaite récupérer
  return useContext(NicknameContext);
};
