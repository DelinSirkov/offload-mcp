# Offload MCP server

Delegate a real-world digital task to a **vetted human**, straight from your AI chat.

Offload's MCP server gives any MCP client (Claude, Cowork, Cursor, ChatGPT, …) three tools:

| Tool | What it does | Auth |
|------|--------------|------|
| `offload_get_quote` | Describe a task → instant AI-scoped category, time estimate, and fair price. | None (free) |
| `offload_post_task` | Post the task to the marketplace → escrow-protected checkout link. | Optional key |
| `offload_task_status` | Check a posted task by ID. | Optional key |

> **The wedge:** you're mid-conversation, hit something you don't want to do, and instead of context-switching you just say *"offload this."* The AI does the automatable ~80%; a vetted human finishes the rest. Escrow-protected, and **Offload never asks for your passwords.**

## Quick start (local / stdio)

```bash
npm install
npm run build
npm start          # runs the stdio server
```

### Use it in Claude Desktop / Cowork

Add to your MCP config (e.g. `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "offload": {
      "command": "npx",
      "args": ["-y", "offload-mcp"],
      "env": {
        "OFFLOAD_API_BASE": "https://offloads.io"
      }
    }
  }
}
```

`offload_get_quote` works with no API key. To enable posting and status, add `OFFLOAD_API_KEY`.

## Remote / hosted (for the Connectors Directory)

```bash
npm run build
npm run start:http   # POST /mcp  (Streamable HTTP), GET /healthz
```

Deploy this anywhere (Render, Fly, Railway, a container) to get a stable `https://…/mcp` URL, then submit it to the [Anthropic Connectors Directory](https://claude.com/docs/connectors/building/submission). A linked privacy policy is required — we point to `https://offloads.io/trust`.

## Configuration

| Env var | Default | Purpose |
|---------|---------|---------|
| `OFFLOAD_API_BASE` | `https://offloads.io` | Offload API base URL |
| `OFFLOAD_API_KEY` | _(empty)_ | Enables `post_task` / `task_status` |
| `PORT` | `8787` | Port for the HTTP server |

## Backend contract

The tools call these public Offload endpoints (implemented as edge functions on the Offload backend):

```
POST /api/public/mcp/quote        { description }                              -> Quote
POST /api/public/mcp/task         { title, description, urgency?, budget?, email? } -> CreatedTask
GET  /api/public/mcp/task/:id                                                   -> TaskStatus
```

See `src/offloadClient.ts` for the exact response shapes.

## Where to list it

Same server, multiple front doors: [Glama](https://glama.ai), [mcp.so](https://mcp.so), [Smithery](https://smithery.ai), [PulseMCP](https://www.pulsemcp.com), and the `punkpeye/awesome-mcp-servers` GitHub list.

## License

MIT — see [LICENSE](./LICENSE).
