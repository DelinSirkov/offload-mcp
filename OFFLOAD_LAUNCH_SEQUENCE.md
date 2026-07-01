# Offload — launch sequence (executable runbook)

The scattered Offload gates (checklist §2–§5 + §9.A) put in **dependency order**. Each phase lists exactly
what you do, the command/where, and what it unblocks. Everything here is yours (logins, money, publishing) —
the agents can't cross any of it. Reusable description blurb is in `DISTRIBUTION_CHECKLIST.md`.

---

## DECISION 0 — pick the launch mode FIRST (it changes the path)
- **Quote-only (recommended to start):** ship the connector with just `get_quote`. Needs **no** backend
  posting, **no** Stripe, **no** API key (`OFFLOAD_API_KEY` blank = quote-only per `render.yaml`/`.env.example`).
  Lowest risk, fastest to distribution — you get listed everywhere while the posting backend matures.
- **Full posting:** also exposes `post_task`/`task_status` → requires Phase 3 (backend edge-functions live +
  live Stripe escrow + the auth decision) **before** it's safe to publish.

**Recommendation:** launch **quote-only** through Phases 1–2 + 4–7 to capture distribution now; turn on posting
(Phase 3) once the backend + Stripe are verified. → resolves §9.A "quote-only vs full posting".

---

## Phase 1 — Code live on GitHub  (repo already exists: github.com/DelinSirkov/offload-mcp)
- [ ] 🔴 **Delete the stray sandbox `.git/`** in `offload-mcp/` (broken partial repo): PowerShell → `Remove-Item -Recurse -Force .git`
- [ ] 🔴 **Verify the diff is clean before pushing** — confirm `health-log.jsonl` and `dist-ui/` are NOT staged (the 2026-06-15 `.gitignore` fix excludes them; this is load-bearing — `health-log.jsonl` is physically in the folder).
- [ ] 🔴 **Push** (PowerShell in `offload-mcp/`):
  ```powershell
  git init; git add .
  git commit -m "offload-mcp v0.1.0: MCP server (get_quote, post_task, task_status)"
  git branch -M main
  git remote add origin https://github.com/DelinSirkov/offload-mcp.git
  git push -u origin main
  ```
- [ ] ⚪ **Set the repo description + topics + (optional) social-preview** in GitHub settings — Glama/mcp.so/PulseMCP scrape these for the listing.
> Unblocks: everything downstream (Render reads the repo; registries scrape it).

## Phase 2 — Server live on Render  (~3 min, all in browser)
- [ ] 🔴 render.com → sign in with **GitHub** → **New → Blueprint** → pick **`offload-mcp`** (it reads `render.yaml`+`Dockerfile`) → **Apply**.
- [ ] 🔴 **Verify:** open `https://offload-mcp.onrender.com/healthz` → expect `{"ok":true}`. The MCP endpoint is `…/onrender.com/mcp`.
- [ ] (full-posting only) Set `OFFLOAD_API_KEY` in Render → Environment.
> Unblocks: the Connectors Directory (needs a live remote `/mcp` URL) + the registry tool-scans.

## Phase 3 — Backend + money  (ONLY if launching full posting; skip for quote-only)
- [ ] 🔴 **Confirm the offloads.io backend `/api/public/mcp/{quote,task,task/:id}` edge functions are live** — the MCP server is a thin HTTP client; posting does nothing until these are deployed.
- [ ] 🔴 **Stand up / confirm the live Stripe escrow** behind `post_task` (requester funds escrow → released on approval); run ONE real end-to-end escrow checkout to confirm a charge + hold works.
- [ ] 🟡 **Decide: authenticate `POST /mcp`?** Today it's open (anyone can call `post_task`/`task_status`). Gate behind a Bearer token vs keep open so directory listings stay anonymous — your product call.
> Unblocks: safe public posting. Until done, keep posting OFF (quote-only).

## Phase 4 — Privacy policy  (required by the Connectors Directory)
- [ ] 🟡 **Fill every `[BRACKETED]` fact** in `PRIVACY_POLICY_DRAFT.md`: effective date · log-retention window · sell-personal-info (confirm) · AI sub-processor(s) + whether task content trains 3rd-party models · hosting/analytics/email sub-processors · data-retention windows · region + cross-border (SCCs) · children's age threshold · legal entity name + address · the `privacy@`/`security@` addresses.
- [ ] 🟡 **Publish it at `https://offloads.io/trust`.**
- [ ] ⚪ **Create `privacy@offloads.io` + `security@offloads.io` mailboxes** so the policy doesn't point at dead addresses.
> Unblocks: Phase 6 (the Directory requires a live privacy-policy URL).

## Phase 5 — MCP registries  (free reach; each ~1 min, uses your GitHub login)
> ⚠️ **Warm the endpoint first** each time (hit `/healthz`) — Render free tier cold-starts ~50s and fails automated tool-scans.
- [ ] 🟡 **Glama** (glama.ai) — sign in w/ GitHub, claim/add the repo. (The metaregistry — highest priority.)
- [ ] 🟡 **mcp.so/submit** — paste repo URL + blurb.
- [ ] 🟡 **Smithery** (smithery.ai) — connect GitHub, add `offload-mcp`. **Generate `smithery.yaml` at submit time** per their current docs (not in the repo yet; format changes).
- [ ] 🟡 **PulseMCP** (pulsemcp.com/submit) — repo URL + hosted `/mcp` URL + blurb.
- [ ] 🟡 **awesome-mcp-servers** — PR to `punkpeye/awesome-mcp-servers` adding Offload (line ready in `DISTRIBUTION_CHECKLIST.md`).

## Phase 6 — Anthropic Connectors Directory  (the big one)
- [ ] 🟡 **Provision a Team/Enterprise Claude org** (Owner, directory-management access) — the gating prerequisite if you're on an individual plan.
- [ ] 🟡 **Warm the endpoint**, then Claude.ai → Settings → Connectors → submit the remote `…/onrender.com/mcp` URL + `https://offloads.io/trust` + support contact + blurb.

## Phase 7 — Public launch  (PH / HN)
- [ ] 🟡 **Upgrade Render free → Starter (~$7/mo)** for always-on (no cold-start for reviewers).
- [ ] ⚪ Post the **Show HN** + **Product Hunt** copy (both drafted in `DISTRIBUTION_CHECKLIST.md` §3).

---

### Dependency at a glance
`DECISION 0` → `Phase 1 (push)` → `Phase 2 (Render)` → [`Phase 3 (backend+Stripe)` only for posting] → `Phase 4 (privacy)` → `Phase 5 (registries)` → `Phase 6 (Directory)` → `Phase 7 (PH/HN)`.
The fastest credible path to "listed everywhere": **quote-only → 1 → 2 → 4 → 5 → 6**, then add posting (3) + go loud (7) once the backend + Stripe are proven.
