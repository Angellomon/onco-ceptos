import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default ({ mode }) => {
  // process.env = { ...process.env, ...loadEnv(mode, ".") };

  return defineConfig({
    plugins: [svelte()],
    optimizeDeps: {
      include: ["lodash.get", "lodash.isequal", "lodash.clonedeep"],
    },
  });
};
