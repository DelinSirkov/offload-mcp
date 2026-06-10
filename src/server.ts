/**
 * Builds the Offload MCP server and registers its tools.
 * Transport-agnostic: used by both the stdio entry (index.ts) and the
 * remote HTTP entry (http.ts).
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { OffloadClient } from "./offloadClient.js";

function money(n: number, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);
  } catch {
    return `${n} ${currency}`;
  }
}

export function createOffloadServer(client = new OffloadClient()): McpServer {
  const server = new McpServer({
    name: "offload",
    version: "0.1.0",
  });

  // --- Tool 1: get a free, instant AI quote (no signup, no key) -------------
  server.registerTool(
    "offload_get_quote",
    {
      title: "Get an Offload quote",
      description:
        "Describe a real-world digital task you're stuck on or don't want to do. " +
        "Offload's AI scopes it and returns a category, a plain-English summary, an " +
        "estimated time, and a fair price — for free, no signup. Use this to show the " +
        "user what handing the task to a vetted human would cost before they commit.",
      inputSchema: {
        description: z
          .string()
          .min(8)
          .describe("What needs doing, in plain English. Include any context that affects scope."),
      },
    },
    async ({ description }) => {
      const q = await client.getQuote(description);
      const lines = [
        `**${q.category}** — ${q.summary}`,
        ``,
        `- Estimated time: ~${q.est_minutes} min`,
        `- Suggested price: ${money(q.suggested_price, q.currency)} (includes Offload's 20% fee)`,
        `- AI can pre-do about ${Math.round(q.automatable_portion * 100)}%; a human finishes the rest`,
        q.needs_sensitive_access
          ? `- Note: needs account access — Offload never asks for passwords; you grant scoped access or do the one sensitive click yourself.`
          : `- No sensitive account access required.`,
      ];
      if (q.recommended_human_actions?.length) {
        lines.push(``, `Human will: ${q.recommended_human_actions.join("; ")}.`);
      }
      lines.push(``, `Want it done? Use offload_post_task to post it.`);
      return { content: [{ type: "text", text: lines.join("\n") }] };
    }
  );

  // --- Tool 2: post a task (returns a checkout link to fund escrow) ---------
  server.registerTool(
    "offload_post_task",
    {
      title: "Post a task to Offload",
      description:
        "Post a task to the Offload marketplace so a vetted human Doer can complete it. " +
        "Returns a secure checkout link where the requester funds escrow; payment is only " +
        "released to the Doer once the requester approves the delivered work.",
      inputSchema: {
        title: z.string().min(3).describe("Short title for the task."),
        description: z.string().min(8).describe("Full description of what needs doing."),
        urgency: z.enum(["standard", "rush"]).optional().describe("Delivery speed. Default standard."),
        budget: z.number().positive().optional().describe("Optional budget cap in USD."),
        email: z.string().email().optional().describe("Requester email for updates and the checkout link."),
      },
    },
    async (input) => {
      const t = await client.postTask(input);
      const text = [
        `Task posted. ID: ${t.task_id}`,
        `Status: ${t.status}`,
        `Price: ${money(t.price, t.currency)}`,
        ``,
        `Fund it (escrow-protected) here: ${t.checkout_url}`,
        ``,
        `Track progress later with offload_task_status using the task ID above.`,
      ].join("\n");
      return { content: [{ type: "text", text }] };
    }
  );

  // --- Tool 3: check task status -------------------------------------------
  server.registerTool(
    "offload_task_status",
    {
      title: "Check an Offload task",
      description: "Check the current status of a posted Offload task by its ID.",
      inputSchema: {
        task_id: z.string().min(1).describe("The task ID returned when the task was posted."),
      },
    },
    async ({ task_id }) => {
      const s = await client.getTaskStatus(task_id);
      const text = [
        `**${s.title}**`,
        `Status: ${s.status}`,
        s.doer ? `Doer: ${s.doer}` : `No Doer assigned yet.`,
        s.updated_at ? `Updated: ${s.updated_at}` : ``,
        ``,
        `Details: ${s.detail_url}`,
      ]
        .filter(Boolean)
        .join("\n");
      return { content: [{ type: "text", text }] };
    }
  );

  return server;
}
