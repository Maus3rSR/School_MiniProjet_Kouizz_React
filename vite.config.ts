import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/School_MiniProjet_Kouizz_React/"
    : "";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // URL de base de l'application, qui est situé dans un sous-dossier
  // Dans le cas d'un déploiement via github pages quand l'url est sous la forme de https://<USERNAME>.github.io/<REPO>/
  //
  // Voir https://vite.dev/guide/static-deploy#github-pages
  base: BASE_URL,
});
