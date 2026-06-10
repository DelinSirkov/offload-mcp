/**
 * Thin client for the Offload public API.
 *
 * Endpoint contract (implemented on the Offload backend as public edge functions):
 *   POST {base}/api/public/mcp/quote        body: { description }                 -> Quote
 *   POST {base}/api/public/mcp/task         body: { title, description, urgency?, budget?, email? } -> CreatedTask
 *   GET  {base}/api/public/mcp/task/:id                                           -> TaskStatus
 *
 * get_quote is public (no key). post_task / task_status accept an optional API key.
 */

export interface Quote {
  category: string;
  summary: string;
  est_minutes: number;
  suggested_price: number;
  currency: string;
  automatable_portion: number; // 0..1, share Offload's AI can pre-do
  needs_sensitive_access: boolean;
  recommended_human_actions: string[];
}

export interface CreatedTask {
  task_id: string;
  status: string;
  price: number;
  currency: string;
  checkout_url: string; // requester completes funding/escrow here
}

export interface TaskStatus {
  task_id: string;
  title: string;
  status: string; // Submitted | Funded | Open | Claimed | In progress | Delivered | Approved | Paid | ...
  doer?: string | null;
  updated_at?: string;
  detail_url: string;
}

export class OffloadClient {
  private base: string;
  private apiKey?: string;

  constructor(base?: string, apiKey?: string) {
    this.base = (base || process.env.OFFLOAD_API_BASE || "https://offloads.io").replace(/\/+$/, "");
    this.apiKey = apiKey || process.env.OFFLOAD_API_KEY || undefined;
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers as Record<string, string> | undefined),
    };
    if (this.apiKey) headers["Authorization"] = `Bearer ${this.apiKey}`;

    const res = await fetch(`${this.base}${path}`, { ...init, headers });
    const text = await res.text();
    if (!res.ok) {
      throw new Error(`Offload API ${res.status} on ${path}: ${text.slice(0, 300)}`);
    }
    return (text ? JSON.parse(text) : {}) as T;
  }

  getQuote(description: string): Promise<Quote> {
    return this.request<Quote>("/api/public/mcp/quote", {
      method: "POST",
      body: JSON.stringify({ description }),
    });
  }

  postTask(input: {
    title: string;
    description: string;
    urgency?: "standard" | "rush";
    budget?: number;
    email?: string;
  }): Promise<CreatedTask> {
    return this.request<CreatedTask>("/api/public/mcp/task", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  getTaskStatus(taskId: string): Promise<TaskStatus> {
    return this.request<TaskStatus>(`/api/public/mcp/task/${encodeURIComponent(taskId)}`, {
      method: "GET",
    });
  }
}
