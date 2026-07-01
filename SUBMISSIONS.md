# Registry Submissions — offload-mcp

Goal: be findable everywhere AI users browse for connectors. Same server, five front doors.

**Ready-to-paste blurb (short):**
> Delegate real-world tasks to vetted humans, straight from your AI chat. Free instant AI quote (no signup), escrow-protected posting, status tracking. AI does ~80%, a human finishes the 20% that matters.

**Links to use everywhere:**
- Remote server: `https://offload-mcp.onrender.com/mcp`
- Repo: `https://github.com/DelinSirkov/offload-mcp`
- Site: `https://offloads.io` · Privacy/trust: `https://offloads.io/trust`

## 1. Glama (highest priority — metaregistry, propagates widely)
- glama.ai → sign in with GitHub (DelinSirkov) → claim/add server from the public repo.
- Confirm the README renders well (it's the listing page).

## 2. mcp.so (what Claude Desktop users browse)
- mcp.so → Submit → repo URL + remote endpoint + blurb above.

## 3. Smithery (agent-dev audience; can also host)
- smithery.ai → sign in with GitHub → add server from repo.
- If it asks for `smithery.yaml`, generate per their current docs at submit time (format changes; don't guess).

## 4. PulseMCP
- pulsemcp.com → Submit a server → repo + remote URL + blurb.

## 5. awesome-mcp-servers (GitHub PR)
- Fork `punkpeye/awesome-mcp-servers`, add under the appropriate category (productivity/task management):
  `- [offload-mcp](https://github.com/DelinSirkov/offload-mcp) — delegate real-world tasks to vetted humans from your AI chat; free instant quotes, escrow payment.`
- PR title: `Add offload-mcp (human task delegation)`.

## 6. Anthropic Connectors Directory (the big one — gated)
- Requires: Team/Enterprise Claude org with Directory management access (Owner submits in-app), live privacy policy (✓ offloads.io/trust), production-grade remote server (✓ after Render paid tier).
- Decision needed from Deo: upgrade org → then submit via the in-app portal.

## Pre-flight before any submission
- [ ] Render upgraded off free tier (cold starts kill first impressions — reviewers WILL hit one)
- [ ] `npm install && npm run build` clean locally; push; Render deploy green
- [ ] Test the card: Claude → Settings → Connectors → the offload connector → ask for a quote → card renders → Post task → checkout link opens
- [ ] README top section mentions the MCP Apps card (screenshots sell)
