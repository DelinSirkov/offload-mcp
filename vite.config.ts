import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// Bundles the MCP Apps quote card (ui/index.html + ui/src/main.ts)
// into a single self-contained HTML file at dist-ui/index.html.
// The MCP server serves that file as the ui:// resource.
export default defineConfig({
  root: "ui",
  plugins: [viteSingleFile()],
  build: {
    outDir: "../dist-ui",
    emptyOutDir: true,
  },
});
