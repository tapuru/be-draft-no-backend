import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/be-draft-no-backend/",
  plugins: [react()],
});
