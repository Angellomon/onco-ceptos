import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default ({ mode }) => {
  // process.env = { ...process.env, ...loadEnv(mode, ".") };

  return defineConfig({
    plugins: [
      svelte(),
      legacy({
        targets: ["defaults", "iOS >= 13.2"],
        polyfills: true,
        modernPolyfills: true,
      }),
    ],
    optimizeDeps: {
      include: ["lodash.get", "lodash.isequal", "lodash.clonedeep"],
    },
  });
};
