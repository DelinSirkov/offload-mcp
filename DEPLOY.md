# Deploy the Offload MCP server (no terminal needed)

This puts the server online at a public `https://…/mcp` URL — the thing you need before submitting to the Anthropic Connectors Directory.

## Option A — Render (free, ~3 minutes, all in the browser)

1. Go to **https://render.com** and sign in with **GitHub** (one click).
2. Click **New** → **Blueprint**.
3. Pick the **`offload-mcp`** repository. Render reads `render.yaml` and `Dockerfile` automatically.
4. Click **Apply**. Render builds and deploys it.
5. When it's live, your URL is shown at the top, like `https://offload-mcp.onrender.com`.
   - Health check: open `https://offload-mcp.onrender.com/healthz` — you should see `{"ok":true}`.
   - The MCP endpoint is `https://offload-mcp.onrender.com/mcp`.

> Free Render services sleep after inactivity and wake on the next request (a few seconds). Fine for launch; upgrade to "Starter" later for always-on.

## Option B — Railway or Fly.io
Same idea: connect the repo, it uses the `Dockerfile`, you get a URL. Render is the simplest to start.

## After it's live
- **Test it:** visit `/healthz`.
- **Submit to the Anthropic Connectors Directory:** Claude.ai → Settings → Connectors → submit your `https://…/mcp` URL. Needs a Team/Enterprise Claude org; privacy policy is required (we point to https://offloads.io/trust).
- **Optional:** if you turn on `post_task`/`task_status` auth, add `OFFLOAD_API_KEY` in the Render dashboard (Environment tab).

Tell me when it's deployed and I'll help with the Connectors Directory submission.
