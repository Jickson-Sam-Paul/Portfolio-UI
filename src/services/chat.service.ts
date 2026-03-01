export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const API_URL =
  "https://portfolio-fastapi-qe-backend-production.up.railway.app/api/chat";

export async function sendChat(
  messages: Message[]
): Promise<ReadableStream<Uint8Array>> {
  const requestBody = {
    messages: messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (!response.body) {
    throw new Error("Response body is null");
  }

  return response.body;
}

let healthAbortController: AbortController | null = null;

export async function checkHealth(): Promise<boolean> {
  try {
    if (healthAbortController) {
      healthAbortController.abort();
    }

    healthAbortController = new AbortController();

    const baseUrl = API_URL.replace(/\/chat\/?$/, "");
    const response = await fetch(`${baseUrl}/health`, {
      signal: healthAbortController.signal,
    });

    if (!response.ok) return false;

    const data = await response.json();
    return data.status === "ok";
  } catch (error: any) {
    if (error.name === "AbortError") {
      return false;
    }
    console.error("Health check failed:", error);
    return false;
  }
}
