/**
 * Offload quote card — MCP App (renders inside Claude/ChatGPT/VS Code chat).
 * Receives the offload_get_quote result from the host, lets the user post
 * the task with one tap, then hands them the escrow checkout link.
 */
import { App } from "@modelcontextprotocol/ext-apps";

interface Quote {
  category: string;
  summary: string;
  est_minutes: number;
  suggested_price: number;
  currency: string;
  automatable_portion: number;
  needs_sensitive_access: boolean;
  recommended_human_actions: string[];
  original_description: string;
}

const $ = (id: string) => document.getElementById(id) as HTMLElement;
const app = new App({ name: "Offload Quote Card", version: "0.1.0" });
let quote: Quote | null = null;

function money(n: number, c = "USD"): string {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: c }).format(n);
  } catch {
    return `$${n}`;
  }
}

function show(view: "loading" | "quote" | "posting" | "success" | "error"): void {
  for (const v of ["loading", "quote", "posting", "success", "error"]) {
    $(v).style.display = v === view ? "block" : "none";
  }
}

function fail(message: string): void {
  $("error-msg").textContent = message;
  show("error");
}

function renderQuote(q: Quote): void {
  $("category").textContent = q.category;
  $("summary").textContent = q.summary;
  $("price").textContent = money(q.suggested_price, q.currency);
  const h = Math.floor(q.est_minutes / 60);
  const m = q.est_minutes % 60;
  $("time").textContent = h > 0 ? `~${h}h${m ? ` ${m}m` : ""}` : `~${m}m`;
  const pct = Math.round((q.automatable_portion ?? 0) * 100);
  ($("autobar") as HTMLElement).style.width = `${pct}%`;
  $("autonote").textContent = `AI pre-does ~${pct}% — a vetted human finishes the rest.`;
  $("sensitive").textContent = q.needs_sensitive_access
    ? "Note: needs account access. Offload never asks for passwords — you grant scoped access or do the one sensitive click yourself."
    : "";
  show("quote");
}

app.ontoolresult = (result: any) => {
  const sc = result?.structuredContent as Quote | undefined;
  if (sc && typeof sc.suggested_price === "number") {
    quote = sc;
    renderQuote(sc);
    return;
  }
  // Host didn't forward structured data — quote is still in the chat as text.
  const txt = (result?.content ?? []).find((c: any) => c.type === "text")?.text ?? "";
  fail(txt ? "Quote shown in chat above — this host didn't pass structured data to the card." : "No quote data received.");
};

$("post-btn").addEventListener("click", async () => {
  if (!quote) return;
  show("posting");
  try {
    const email = ($("email") as HTMLInputElement).value.trim();
    const rush = ($("rush") as HTMLInputElement).checked;
    const res: any = await app.callServerTool({
      name: "offload_post_task",
      arguments: {
        title: quote.category.slice(0, 80),
        description: quote.original_description || quote.summary,
        urgency: rush ? "rush" : "standard",
        ...(email ? { email } : {}),
      },
    });
    const t = res?.structuredContent as { task_id?: string; checkout_url?: string } | undefined;
    const text = (res?.content ?? []).find((c: any) => c.type === "text")?.text ?? "";
    const url = t?.checkout_url ?? (text.match(/https?:\/\/\S*checkout\S*/i) ?? [])[0];
    if (!url) throw new Error("no checkout link in response");
    if (!/^https:\/\//i.test(url)) throw new Error("checkout link is not a valid https URL");
    $("task-id").textContent = t?.task_id ? `task ${t.task_id}` : "";
    const a = $("checkout-link") as HTMLAnchorElement;
    a.href = url;
    a.addEventListener("click", (e) => {
      const anyApp = app as any;
      if (typeof anyApp.openLink === "function") {
        e.preventDefault();
        anyApp.openLink(url);
      }
    });
    show("success");
  } catch (err: any) {
    fail(`Posting failed: ${err?.message ?? err}. You can also post it by asking the assistant to run offload_post_task.`);
  }
});

app.connect();
show("loading");
