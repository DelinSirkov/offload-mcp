/**
 * Remote (HTTP) entry point — Streamable HTTP transport.
 * Host this to get a remote MCP server URL, which is what the Anthropic
 * Connectors Directory and hosted clients consume.
 *
 * Stateless mode: a fresh transport per request. Good enough for these
 * short, idempotent tools and trivial to scale horizontally.
 */
import express, { type Request, type Response } from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createOffloadServer } from "./server.js";

const app = express();
app.use(express.json());

app.get("/healthz", (_req, res) => {
  res.json({ ok: true, service: "offload-mcp" });
});

app.post("/mcp", async (req: Request, res: Response) => {
  try {
    const server = createOffloadServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // stateless
    });
    res.on("close", () => {
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error("MCP request error:", err);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  }
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => {
  console.error(`offload-mcp HTTP server listening on :${port}  (POST /mcp)`);
});
