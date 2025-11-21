import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/to_do_list/",
  plugins: [react()],
});
