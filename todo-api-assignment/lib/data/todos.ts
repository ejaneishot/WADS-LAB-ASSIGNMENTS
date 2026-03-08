export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
};

export type CreateTodoInput = {
  title: string;
  description?: string;
  priority?: Todo["priority"];
};

export type UpdateTodoInput = Partial<
  Pick<Todo, "title" | "description" | "completed" | "priority">
>;

const now = () => new Date().toISOString();

let todos: Todo[] = [
  {
    id: "todo-1",
    title: "Finish backend assignment",
    description: "Build CRUD endpoints with Swagger documentation",
    completed: false,
    priority: "high",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "todo-2",
    title: "Review API responses",
    description: "Make sure status codes and payloads are consistent",
    completed: true,
    priority: "medium",
    createdAt: now(),
    updatedAt: now(),
  },
];

export function getTodos(filters?: {
  completed?: boolean;
  priority?: Todo["priority"];
  search?: string;
}) {
  return todos.filter((todo) => {
    const matchesCompleted =
      filters?.completed === undefined || todo.completed === filters.completed;
    const matchesPriority =
      !filters?.priority || todo.priority === filters.priority;
    const matchesSearch =
      !filters?.search ||
      `${todo.title} ${todo.description}`
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    return matchesCompleted && matchesPriority && matchesSearch;
  });
}

export function getTodoById(id: string) {
  return todos.find((todo) => todo.id === id) ?? null;
}

export function createTodo(input: CreateTodoInput) {
  const timestamp = now();
  const newTodo: Todo = {
    id: `todo-${Date.now()}`,
    title: input.title.trim(),
    description: input.description?.trim() || "",
    completed: false,
    priority: input.priority ?? "medium",
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  todos = [newTodo, ...todos];
  return newTodo;
}

export function updateTodo(id: string, input: UpdateTodoInput) {
  const todo = getTodoById(id);
  if (!todo) return null;

  const updated: Todo = {
    ...todo,
    ...(input.title !== undefined ? { title: input.title.trim() } : {}),
    ...(input.description !== undefined
      ? { description: input.description.trim() }
      : {}),
    ...(input.completed !== undefined ? { completed: input.completed } : {}),
    ...(input.priority !== undefined ? { priority: input.priority } : {}),
    updatedAt: now(),
  };

  todos = todos.map((item) => (item.id === id ? updated : item));
  return updated;
}

export function deleteTodo(id: string) {
  const todo = getTodoById(id);
  if (!todo) return null;

  todos = todos.filter((item) => item.id !== id);
  return todo;
}
