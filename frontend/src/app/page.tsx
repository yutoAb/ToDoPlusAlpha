import AddTodoForm from "@/components/AddTodoForm";
import { fetchJSON } from "@/lib/api";

type Todo = { id: number; title: string };

async function getTodos() {
  return fetchJSON<Todo[]>("/api/todos");
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-2xl">
        <section className="w-full">
          <h2 className="text-xl font-semibold mb-2">Todos</h2>
          {todos.length === 0 ? (
            <p className="text-sm text-gray-500">No tasks yet.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {todos.map((t) => (
                <li key={t.id} className="text-base">
                  {t.title}
                </li>
              ))}
            </ul>
          )}
        </section>

        <AddTodoForm />
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <p>フッター</p>
      </footer>
    </div>
  );
}
