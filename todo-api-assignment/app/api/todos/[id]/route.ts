import { NextResponse } from "next/server";

const todos = [
  { id: 1, title: "Finish backend assignment", completed: false },
  { id: 2, title: "Review API documentation", completed: true },
];

// GET /api/todos/:id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const todoId = Number(params.id);
  const todo = todos.find((item) => item.id === todoId);

  if (!todo) {
    return NextResponse.json(
      {
        success: false,
        message: "Todo not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Todo fetched successfully",
      data: todo,
    },
    { status: 200 }
  );
}

// PUT /api/todos/:id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const todoId = Number(params.id);
    const body = await request.json();
    const { title, completed } = body;

    const existingTodo = todos.find((item) => item.id === todoId);

    if (!existingTodo) {
      return NextResponse.json(
        {
          success: false,
          message: "Todo not found",
        },
        { status: 404 }
      );
    }

    const updatedTodo = {
      ...existingTodo,
      title: title ?? existingTodo.title,
      completed: completed ?? existingTodo.completed,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Todo updated successfully",
        data: updatedTodo,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body",
      },
      { status: 400 }
    );
  }
}

// DELETE /api/todos/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const todoId = Number(params.id);
  const existingTodo = todos.find((item) => item.id === todoId);

  if (!existingTodo) {
    return NextResponse.json(
      {
        success: false,
        message: "Todo not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Todo deleted successfully",
      data: existingTodo,
    },
    { status: 200 }
  );
}