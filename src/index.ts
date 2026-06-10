#!/usr/bin/env node
/**
 * Local (stdio) entry point.
 * This is what Claude Desktop / Cowork / Cursor launch to talk to Offload.
 */
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createOffloadServer } from "./server.js";

async function main() {
  const server = createOffloadServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // stdio servers communicate over stdin/stdout; log to stderr only.
  console.error("offload-mcp running on stdio");
}

main().catch((err) => {
  console.error("offload-mcp failed to start:", err);
  process.exit(1);
});
