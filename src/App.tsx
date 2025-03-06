import { BrowserRouter, Routes, Route } from "react-router";
import { dependencies } from "./config/dependencies";
import { DependenciesContext } from "./context/DependenciesProvider";
import Game from "./pages/Game";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/Default";
import { useState } from "react";
import { NicknameContext } from "./context/NicknameProvider";

export default function App() {
  const [nickName, updateNickName] = useState("");

  return (
    <NicknameContext.Provider value={{ nickName, updateNickName }}>
      <DependenciesContext.Provider value={dependencies}>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route index element={<Home />} />
              <Route path="/game" element={<Game />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DependenciesContext.Provider>
    </NicknameContext.Provider>
  );
}
