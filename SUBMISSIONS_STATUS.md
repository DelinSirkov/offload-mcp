# Offload MCP — Submissions Status

Live status of offload-mcp distribution listings. Maintained by the `offload-submission-tracker` scheduled task.
Source of truth for blurbs/links: `SUBMISSIONS.md` + `DISTRIBUTION_CHECKLIST.md`.

Canonical links:
- Repo: https://github.com/DelinSirkov/offload-mcp
- Endpoint: https://offload-mcp.onrender.com/mcp
- Site: https://offloads.io · Trust/privacy: https://offloads.io/trust

| Registry | Status | Live URL | Last checked | Note |
|---|---|---|---|---|
| Glama | NOT FOUND | — | 2026-06-26 18:45 UTC | No listing surfaced. Glama auto-discovers public GitHub MCP repos; once repo is public it should index within ~a day. To speed up: sign in w/ GitHub, claim/add repo. |
| mcp.so | NOT FOUND | — | 2026-06-26 18:45 UTC | No listing surfaced. Manual submit at mcp.so/submit (repo URL + blurb). |
| Smithery | NOT FOUND | — | 2026-06-26 18:45 UTC | No listing surfaced. Manual add at smithery.ai (connect GitHub → select repo; list remote Render endpoint). |
| PulseMCP | NOT FOUND | — | 2026-06-26 18:45 UTC | No listing surfaced. Manual submit at pulsemcp.com/submit (repo + /mcp URL + blurb). |
| awesome-mcp-servers (punkpeye) | PR OPEN | https://github.com/punkpeye/awesome-mcp-servers/pull/8583 | 2026-06-26 | ✅ PR #8583 opened (DelinSirkov:add-offload-mcp → main; under Workplace & Productivity, alphabetical after delega-dev; "Able to merge"). Status as of 2026-06-23 was "Able to merge" — merge state unconfirmed as of 2026-06-26. |
| Anthropic Connectors Directory | GATED (do not submit) | — | 2026-06-26 18:45 UTC | Requires Owner of a Team/Enterprise Claude org w/ directory-management access. Decision pending from Deo (org upgrade). Do NOT auto-submit. |

## Check method / caveats
- Unattended read path is constrained: `web_fetch` is provenance-locked (can't open registry pages directly), and the browser path is blocked by 3-browser ambiguity (can't resolve without Deo present). Checks rely on domain-scoped web search, which can lag a registry's own index.
- No submission has been made yet per git log (only initial v0.1.0 + Docker/Render commits) and no listing URLs / PR numbers recorded in repo notes. "NOT FOUND" is consistent with nothing having been submitted.
- "NOT FOUND" here means "not detected via available search," not a hard confirmation of absence. A registry page may exist but be unindexed. When the browser path is available (single browser / Deo present), do a definitive page check.

## Next actions (Deo does the submit — tracker never submits)
All five public registries are ready to submit; paste-ready blurbs + exact steps are in `DISTRIBUTION_CHECKLIST.md` and `SUBMISSIONS.md`. Pre-flight: confirm Render is off the free tier (cold starts hurt reviewer first impressions) and `npm run build` is clean before submitting.
