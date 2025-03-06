import { createContext, useContext } from "react";

export const NicknameContext = createContext<{
  nickName: string;
  updateNickName: (nickName: string) => void;
}>({
  nickName: "",
  updateNickName: () => {},
});

export const useNickname = () => useContext(NicknameContext);
