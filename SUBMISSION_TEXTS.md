# Offload MCP — directory submission texts (ready to paste)

Grounded in README facts: 3 tools (get_quote, post_task, task_status), live remote
endpoint https://offload-mcp.onrender.com/mcp, repo github.com/DelinSirkov/offload-mcp,
MIT licensed. No em-dashes. Drafted 2026-06-15.

> Pre-flight before submitting: the live endpoint should be WARM when a directory scans it.
> Render free tier cold-starts (~50s) can fail an automated tool scan. Upgrade to Starter
> first (see render.yaml), or hit the endpoint once right before submitting.

---

## awesome-mcp-servers (GitHub PR)

```
- [offload-mcp](https://github.com/DelinSirkov/offload-mcp) - Delegate a real-world digital task to a vetted human from your AI chat. Three tools (get_quote, post_task, task_status): get an instant free AI-scoped quote, post the task with Stripe escrow protection, and check its status. The AI does the automatable ~80% and a human finishes the rest.
```

**Gotcha:** Fork punkpeye/awesome-mcp-servers, add the bullet under the productivity / task-management category, keep alphabetical order, match the existing hyphen punctuation. PR title: "Add offload-mcp (human task delegation)". Repo needs a README + license (has both: README + MIT).

---

## Glama (claim-by-GitHub)

```
Name: Offload MCP server
Repository: https://github.com/DelinSirkov/offload-mcp
Remote endpoint: https://offload-mcp.onrender.com/mcp

Summary: Delegate a real-world digital task to a vetted human, straight from your AI chat. Offload exposes three tools to any MCP client: get_quote (describe a task and get an instant AI-scoped category, time estimate, and fair price, free and no key required), post_task (post the task to the marketplace and get a Stripe escrow-protected checkout link), and task_status (check a posted task by ID). The AI handles the automatable ~80% and a vetted human finishes the 20% that matters. Tasks are escrow-protected and Offload never asks for your passwords.

License: MIT
```

**Gotcha:** Sign in as DelinSirkov and claim/add from the public repo. Glama renders the README as the listing and auto-scores it, so make sure the README looks complete. A repo social-preview image improves the card.

---

## mcp.so (Submit form)

```
Name: Offload
Tagline: Delegate a real-world task to a vetted human, straight from your AI chat.
Repository: https://github.com/DelinSirkov/offload-mcp
Remote / hosted endpoint: https://offload-mcp.onrender.com/mcp

Description: Offload's MCP server gives any MCP client (Claude, Cowork, Cursor, ChatGPT, and others) three tools for delegating real-world digital tasks to a vetted human. get_quote describes a task and returns an instant AI-scoped category, time estimate, and fair price (free, no key). post_task posts the task to the marketplace and returns a Stripe escrow-protected checkout link. task_status checks a posted task by its ID. The AI does the automatable ~80% and a vetted human finishes the rest. Escrow-protected, and Offload never asks for your passwords.

Category: Productivity / Task management
```

**Gotcha:** The Submit form takes the repo URL + remote endpoint + blurb. It scrapes the README for the long description, so the on-repo README is what users see.

---

## Smithery (add-by-GitHub)

```
Name: Offload
Repository: https://github.com/DelinSirkov/offload-mcp
Hosted endpoint: https://offload-mcp.onrender.com/mcp

Description: Delegate a real-world digital task to a vetted human, straight from your AI chat. Three tools: get_quote (describe a task, get an instant AI-scoped category, time estimate, and fair price, free and no key required), post_task (post to the marketplace, get a Stripe escrow-protected checkout link), and task_status (look up a posted task by ID). The AI does the automatable ~80% and a vetted human finishes the 20% that matters. Escrow-protected, and Offload never asks for your passwords.

License: MIT
```

**Gotcha:** Sign in with GitHub and add from the repo. Smithery may want a smithery.yaml in the repo to enable its hosted/tool-scanning build (not currently present, generate per their current docs at submit time). It runs a tool scan, so the endpoint must be warm (Render cold-start can time out the first scan).

---

## PulseMCP (Submit a server form)

```
Name: Offload
Short description: Delegate a real-world digital task to a vetted human, straight from your AI chat.
Repository: https://github.com/DelinSirkov/offload-mcp
Remote server URL: https://offload-mcp.onrender.com/mcp

Long description: Offload's MCP server gives any MCP client three tools for handing real-world digital work to a vetted human. get_quote describes a task and returns an instant AI-scoped category, time estimate, and fair price (free, no key). post_task posts the task to the marketplace and returns a Stripe escrow-protected checkout link. task_status checks a posted task by ID. The AI does the automatable ~80% and a vetted human finishes the rest. Escrow-protected, and Offload never asks for your passwords.

Category: Productivity / Task management
License: MIT
```

**Gotcha:** The "Submit a server" form takes the repo + remote URL + blurb. PulseMCP editorially curates and pulls metadata from the repo, so fill in the repo description + topics before submitting.
