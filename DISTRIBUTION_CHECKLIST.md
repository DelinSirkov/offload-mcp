# Offload MCP — distribution checklist

Everything below uses these two live URLs:

- **GitHub repo:** https://github.com/DelinSirkov/offload-mcp
- **Hosted MCP endpoint:** https://offload-mcp.onrender.com/mcp  (health: `/healthz`)

Reusable blurb (paste anywhere a description is needed):
> **Offload** — delegate a real-world digital task to a vetted human, straight from your AI chat. Free AI quote, post a task, track it to delivery. Escrow-protected, never asks for your passwords. AI does the automatable ~80%, a human finishes the rest.

---

## 1. MCP registries (each ~1 min, needs your GitHub login)

**Glama** — https://glama.ai
- It auto-discovers public GitHub MCP repos; ours is new, so it should appear within ~a day.
- To speed it up: sign in with GitHub → look for "Add server" / claim, paste the repo URL.

**mcp.so** — https://mcp.so/submit
- Paste the GitHub repo URL + the blurb above. Submit.

**Smithery** — https://smithery.ai
- "Add server" → connect GitHub → select `offload-mcp`. It can also host the remote version (we already have one on Render, so just list it).

**PulseMCP** — https://www.pulsemcp.com/submit
- Fill the form with the repo URL, the hosted `/mcp` URL, and the blurb.

**awesome-mcp-servers** (GitHub list) — https://github.com/punkpeye/awesome-mcp-servers
- Click the pencil/edit on README, add this under a fitting category (e.g. "Productivity" or "Marketplaces"), open a Pull Request:
  ```
  - [DelinSirkov/offload-mcp](https://github.com/DelinSirkov/offload-mcp) — Delegate a real-world task to a vetted human from your AI chat: free AI quote, post a task, track it. Escrow-protected.
  ```

## 2. Anthropic Connectors Directory (the big one)
- **Where:** Claude.ai → Settings → Connectors → submit a connector.
- **What to enter:** the remote URL `https://offload-mcp.onrender.com/mcp`, privacy policy `https://offloads.io/trust`, support contact, the blurb above.
- **Requirement:** you must be an Owner of a **Team or Enterprise** Claude organization with directory-management access. If you're on an individual plan, this is the one step that needs a plan upgrade first.

## 3. Launch posts (when ready)
**Show HN title:**
> Show HN: Offload – an open-source MCP server that hands your busywork to a vetted human

**Product Hunt tagline:**
> Offload any task. A human gets it done. AI scopes it, a vetted human delivers — from inside your AI chat.

---

### Tip before a big launch
The Render free tier sleeps after inactivity (first request takes ~50s to wake). Before Product Hunt / HN, switch the Render service to the **Starter** plan ($7/mo) for always-on, so first-time visitors don't hit a cold start.
