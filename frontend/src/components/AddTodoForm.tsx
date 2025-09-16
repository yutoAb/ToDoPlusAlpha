"use client";

import { useState, FormEvent } from "react";
import { API_BASE } from "@/lib/api";
import { TextField } from "@mui/material";

export default function AddTodoForm() {
  const [title, setTitle] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setPending(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error(`Create failed: ${res.status}`);
      setTitle("");
      // 簡易リフレッシュ（本来はSWRやrouter.refresh推奨）
      window.location.reload();
    } catch (e: any) {
      setError(e?.message ?? "Failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2 w-full sm:w-auto">
      <TextField
        id="outlined-basic"
        label="新しいToDoを入力してください"
        fullWidth
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="border rounded px-3 py-1"
        disabled={pending}
        type="submit"
      >
        {pending ? "Adding..." : "Add"}
      </button>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </form>
  );
}
