import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";
import { dependencies } from "./config/dependencies";
import DefaultLayout from "./layouts/Default";
import Home from "./pages/Home";
import Game from "./pages/Game";
import DependenciesProvider from "./components/DependenciesProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DependenciesProvider services={dependencies}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DependenciesProvider>
  </StrictMode>
);
