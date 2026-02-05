import type { ModelDefinitionConfig } from "../config/types.models.js";

export const X_AIO_BASE_URL = "https://code-api.x-aio.com/v1";
export const X_AIO_DASHBOARD_MODELS_URL =
  "https://dashboard.x-aio.com/api/index_view/code_plan_model_list";

const DEFAULT_CONTEXT_WINDOW = 128000;
const DEFAULT_MAX_TOKENS = 16384;
const DEFAULT_COST = {
  input: 0,
  output: 0,
  cacheRead: 0,
  cacheWrite: 0,
};

export type XAioDashboardModel = {
  id: string;
  contextWindow: number;
  supportsVision: boolean;
  supportsReasoning: boolean;
  tags: string[];
};

type XAioDashboardResponse = {
  code?: string;
  message?: string;
  data?: Array<{
    real_model_name?: string;
    context?: number | string;
    tags?: string[] | null;
  }>;
};

type OpenAiModelsResponse = {
  object?: string;
  data?: Array<{ id?: string }>;
};

const EMBEDDING_KEYWORDS = [
  "embed",
  "embedding",
  "bge",
  "m3e",
  "text-embedding",
  "gte-",
  "e5-",
  "nomic-embed",
  "instructor",
  "minilm",
  "sentence-transformers",
  "baai",
  "voyage",
  "cohere-embed",
];

export function isXAioEmbeddingModelId(modelId: string): boolean {
  const normalized = modelId.toLowerCase();
  return EMBEDDING_KEYWORDS.some((kw) => normalized.includes(kw));
}

export function buildXAioModelDefinition(params: {
  id: string;
  contextWindow?: number;
  supportsVision?: boolean;
  supportsReasoning?: boolean;
}): ModelDefinitionConfig {
  const id = params.id;
  const supportsVision = params.supportsVision ?? false;
  const supportsReasoning = params.supportsReasoning ?? false;
  const contextWindow = params.contextWindow ?? DEFAULT_CONTEXT_WINDOW;

  return {
    id,
    name: id,
    reasoning: supportsReasoning,
    input: supportsVision ? ["text", "image"] : ["text"],
    cost: DEFAULT_COST,
    contextWindow,
    maxTokens: DEFAULT_MAX_TOKENS,
    ...(id.startsWith("XAIO-O")
      ? { api: "openai-responses" as const }
      : {
          compat: {
            supportsDeveloperRole: false,
          },
        }),
  };
}

export async function fetchXAioDashboardModels(): Promise<XAioDashboardModel[]> {
  const response = await fetch(X_AIO_DASHBOARD_MODELS_URL, {
    method: "GET",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) {
    throw new Error(`Dashboard returned HTTP ${response.status}`);
  }
  const data = (await response.json()) as XAioDashboardResponse;
  if (data.code !== "200") {
    throw new Error(`Dashboard returned code=${String(data.code ?? "")} ${data.message ?? ""}`);
  }
  if (!Array.isArray(data.data)) {
    throw new Error("Dashboard response missing data array");
  }

  const out: XAioDashboardModel[] = [];
  for (const item of data.data) {
    const id = typeof item.real_model_name === "string" ? item.real_model_name.trim() : "";
    if (!id) {
      continue;
    }
    const tags = Array.isArray(item.tags) ? item.tags.filter((t) => typeof t === "string") : [];

    const rawContext = item.context;
    const contextNum =
      typeof rawContext === "number"
        ? rawContext
        : typeof rawContext === "string"
          ? Number(rawContext)
          : NaN;
    const contextWindow = Number.isFinite(contextNum)
      ? Math.max(1, Math.trunc(contextNum)) * 1000
      : DEFAULT_CONTEXT_WINDOW;

    const supportsVision = tags.includes("视觉");
    const supportsReasoning = tags.includes("推理") || tags.includes("交替推理");

    out.push({ id, contextWindow, supportsVision, supportsReasoning, tags });
  }
  out.sort((a, b) => a.id.localeCompare(b.id));
  return out;
}

export async function fetchXAioAccessibleModelIds(params: {
  apiKey: string;
}): Promise<Set<string>> {
  const url = `${X_AIO_BASE_URL}/models`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${params.apiKey}`,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    const err = new Error(`X-AIO /models returned HTTP ${response.status}`);
    (err as { status?: number }).status = response.status;
    throw err;
  }

  const data = (await response.json()) as OpenAiModelsResponse;
  if (!Array.isArray(data.data)) {
    throw new Error("Invalid /models response: missing data[]");
  }

  const ids = new Set<string>();
  for (const item of data.data) {
    const id = typeof item.id === "string" ? item.id.trim() : "";
    if (id) {
      ids.add(id);
    }
  }
  return ids;
}
