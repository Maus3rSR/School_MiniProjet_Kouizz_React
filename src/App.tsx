// React router est un package nous permettant de créer différentes routes dans notre application
import { BrowserRouter, Routes, Route } from "react-router";
import { dependencies } from "./config/dependencies";
import { DependenciesContext } from "./context/DependenciesProvider";
import Game from "./pages/Game";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/Default";
import { useState } from "react";
import { NicknameContext } from "./context/NicknameProvider";

// Github Pages base url - On doit configurer le base url de l'application pour le router de React
const BASE_URL = import.meta.env.PROD ? import.meta.env.BASE_URL : "";

export default function App() {
  const [nickName, updateNickName] = useState("");

  return (
    // On englobe les composants qui peuvent avoir au contexte
    // avec le composant MonContext.Provider
    // value correspond à la valeur que vous devez passer au context
    <NicknameContext.Provider value={{ nickName, updateNickName }}>
      <DependenciesContext.Provider value={dependencies}>
        {/* Utilisation du composant BrowserRouter qui initialise un router pour le navigateur */}
        <BrowserRouter basename={BASE_URL}>
          <Routes>
            {/* Ici, on englobe les routes de l'application, d'une autre route */}
            {/* Qui nous sert ici à définir un layout de l'application */}
            {/* Ce composant sera affiché sur toutes ces routes enfant */}
            <Route element={<DefaultLayout />}>
              {/* index défini la route comme celle par défaut s'il ne match aucun autre chemin */}
              {/* cette route fait un rendu du composant Home */}
              <Route index element={<Home />} />
              {/* path défini un chemin de notre url, qui est ici /game */}
              {/* Si cette url est reconnue, le composant Game qui sera affiché */}
              <Route path="/game" element={
                <Game />
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </DependenciesContext.Provider>
    </NicknameContext.Provider>
  );
}
