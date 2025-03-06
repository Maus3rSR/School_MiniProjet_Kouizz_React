import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // URL de base de l'application, qui est situé dans un sous-dossier
  // Dans le cas d'un déploiement via github pages quand l'url est sous la forme de https://<USERNAME>.github.io/<REPO>/
  //
  // Voir https://vite.dev/guide/static-deploy#github-pages
  base: "/School_MiniProjet_Kouizz_React/",
});
