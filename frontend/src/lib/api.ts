export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:5001";

export async function fetchJSON<T>(path: string, init?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json() as Promise<T>;
}
