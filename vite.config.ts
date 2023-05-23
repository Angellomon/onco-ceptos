import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const root = process.env.MSD_PATH || "/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    include: ["lodash.get", "lodash.isequal", "lodash.clonedeep"],
  },
  root,
});
