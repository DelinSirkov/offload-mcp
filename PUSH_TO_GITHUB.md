# Push offload-mcp to GitHub (one-time, ~1 minute)

The repo is already created (public): **https://github.com/DelinSirkov/offload-mcp**
Pushing the code needs your own GitHub login, so run these on your machine.

## 1. Clean up the stray git folder
A partial `.git/` folder may exist from the sandbox (it can't write to your Windows mount). In this folder, delete it first:

- **File Explorer:** turn on "Hidden items", delete the `.git` folder, **or**
- **PowerShell** in this folder:
  ```powershell
  Remove-Item -Recurse -Force .git
  ```

## 2. Push (PowerShell, in this `offload-mcp` folder)
```powershell
git init
git add .
git commit -m "offload-mcp v0.1.0: MCP server (get_quote, post_task, task_status)"
git branch -M main
git remote add origin https://github.com/DelinSirkov/offload-mcp.git
git push -u origin main
```

That's it — the code is live in the repo.

## 4. Then list it on the MCP registries (free reach)
Same server, multiple front doors. Each takes a few minutes and uses your GitHub login:

| Registry | How to submit |
|----------|----------------|
| **Glama** (glama.ai) | Auto-indexes public GitHub MCP repos; submit/claim at glama.ai. Highest priority — it's the metaregistry. |
| **mcp.so** | Submit your repo URL on the site. |
| **Smithery** (smithery.ai) | Connect GitHub, add the server; can also host the remote version. |
| **PulseMCP** (pulsemcp.com) | Submit via their "add a server" form. |
| **awesome-mcp-servers** | Open a PR to `punkpeye/awesome-mcp-servers` adding Offload under the right category. |

## 5. Submit to the Anthropic Connectors Directory (the big one)
Needs the **remote** server deployed (run `npm run start:http` on a host → stable `https://…/mcp` URL) and a Team/Enterprise Claude org. Submit in Claude.ai → Settings → Connectors. Privacy policy is required; we point to https://offloads.io/trust.

---
Tell me your GitHub username if you'd like me to pre-fill the exact commands and the registry submission text for each site.
