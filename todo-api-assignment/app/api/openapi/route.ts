import { NextResponse } from "next/server";

export async function GET() {
  const spec = {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
    },
    paths: {
      "/api/todos": {
        get: {
          summary: "Get all todos",
          responses: { 200: { description: "List of todos" } },
        },
        post: {
          summary: "Create todo",
          responses: { 201: { description: "Created todo" } },
        },
      },
      "/api/todos/{id}": {
        get: {
          summary: "Get todo by id",
          responses: { 200: { description: "Todo found" } },
        },
        put: {
          summary: "Update todo",
          responses: { 200: { description: "Updated todo" } },
        },
        delete: {
          summary: "Delete todo",
          responses: { 200: { description: "Deleted todo" } },
        },
      },
    },
  };

  return NextResponse.json(spec);
}