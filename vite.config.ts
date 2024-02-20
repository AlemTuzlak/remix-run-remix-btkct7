import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { createRoutesFromFolders } from "@remix-run/v1-route-convention";
import mdx from "@mdx-js/rollup";
import { remixDevTools } from "remix-development-tools/vite";
const ignoredRoutePatterns = [
  "**/.*",
  "**/components/**",
  "**/integration/*.test.*",
];

export default defineConfig({
  plugins: [
    remixDevTools(),
    remix({
      ignoredRouteFiles: ignoredRoutePatterns,
      routes(defineRoutes) {
        return createRoutesFromFolders(defineRoutes, {
          //Our convention is to not consider anything under the routes/**/components to be a route.
          ignoredFilePatterns: ignoredRoutePatterns,
        }) as any;
      },
    }),
    mdx(),
    tsconfigPaths(),
  ],
  server: {
    open: true,
  },
});
