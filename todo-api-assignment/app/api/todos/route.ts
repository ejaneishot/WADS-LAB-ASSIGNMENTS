import { NextRequest, NextResponse } from "next/server";
import { createTodo, getTodos } from "@/lib/data/todos";
import { errorResponse, successResponse } from "@/lib/utils/api-response";

const allowedPriorities = ["low", "medium", "high"] as const;

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     description: Returns the list of todo items. Supports optional filtering by completed status, priority, and search keyword.
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter todos by completion status.
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *         description: Filter todos by priority.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title or description.
 *     responses:
 *       200:
 *         description: Todo list fetched successfully.
 *   post:
 *     summary: Create a new todo
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *     responses:
 *       201:
 *         description: Todo created successfully.
 *       400:
 *         description: Invalid request body.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const completedParam = searchParams.get("completed");
  const priorityParam = searchParams.get("priority");
  const search = searchParams.get("search") ?? undefined;

  const completed =
    completedParam === null
      ? undefined
      : completedParam === "true"
        ? true
        : completedParam === "false"
          ? false
          : "invalid";

  if (completed === "invalid") {
    return NextResponse.json(
      errorResponse("Query parameter 'completed' must be true or false."),
      { status: 400 },
    );
  }

  if (
    priorityParam &&
    !allowedPriorities.includes(priorityParam as (typeof allowedPriorities)[number])
  ) {
    return NextResponse.json(
      errorResponse("Query parameter 'priority' must be low, medium, or high."),
      { status: 400 },
    );
  }

  const todos = getTodos({
    completed,
    priority: priorityParam as "low" | "medium" | "high" | undefined,
    search,
  });

  return NextResponse.json(successResponse(todos, "Todos fetched successfully."), {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  let body: {
    title?: string;
    description?: string;
    priority?: "low" | "medium" | "high";
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(errorResponse("Invalid JSON body."), { status: 400 });
  }

  if (!body.title || !body.title.trim()) {
    return NextResponse.json(errorResponse("'title' is required."), {
      status: 400,
    });
  }

  if (body.priority && !allowedPriorities.includes(body.priority)) {
    return NextResponse.json(
      errorResponse("'priority' must be low, medium, or high."),
      { status: 400 },
    );
  }

  const todo = createTodo(body);

  return NextResponse.json(successResponse(todo, "Todo created successfully."), {
    status: 201,
  });
}
