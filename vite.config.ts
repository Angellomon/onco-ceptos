import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const base = process.env.MSD_PATH || "/";

  console.log(base, mode);

  return defineConfig({
    plugins: [svelte()],
    optimizeDeps: {
      include: ["lodash.get", "lodash.isequal", "lodash.clonedeep"],
    },
    server: {
      base,
    },
  });
};
