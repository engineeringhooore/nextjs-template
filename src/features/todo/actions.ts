"use server";

import { revalidatePath } from "next/cache";
import { addTodoSchema, editTodoSchema } from "./schema";
import type { AddTodoState, EditTodoState, Todo } from "./types";
import { redirect } from "@/i18n/routing";

const todos: Todo[] = [
  {
    id: "todo-1",
    note: "eum et est occaecati",
    attachment: "https://picsum.photos/200",
  },
  {
    id: "todo-2",
    note: "dolorem eum magni eos aperiam quia",
    attachment: "",
  },
  {
    id: "todo-3",
    note: "nesciunt iure omnis dolorem tempora et accusantium",
    attachment: "https://picsum.photos/200",
  },
];

export async function addTodo(
  revalidatePathString: string,
  revalidatePathType: "page" | "layout",
  prevState: AddTodoState,
  formData: FormData,
): Promise<AddTodoState> {
  const validatedFields = addTodoSchema.safeParse({
    note: formData.get("note"),
  });

  if (!validatedFields.success) {
    return {
      key: prevState.key,
      success: false,
      message: "",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  todos.push({
    id: (Math.random() + 1).toString(36).substring(7),
    note: validatedFields.data.note,
    attachment: "",
  });

  revalidatePath(revalidatePathString, revalidatePathType);
  return {
    key: Date.now().toString(),
    success: true,
    message: "",
    errors: {},
  };
}

export async function getAllTodo() {
  return todos;
}

export async function getTodoById(todoId: string) {
  return todos.find((todo) => {
    return todo.id === todoId;
  });
}

export async function editTodoById(
  revalidatePathString: string,
  revalidatePathType: "page" | "layout",
  todoId: string,
  prevState: EditTodoState,
  formData: FormData,
): Promise<EditTodoState> {
  const validatedFields = editTodoSchema.safeParse({
    note: formData.get("note"),
    attachment: formData.get("attachment"),
  });

  if (!validatedFields.success) {
    return {
      key: prevState.key,
      success: false,
      message: "",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const todo = await getTodoById(todoId);

  if (!todo) {
    return {
      key: prevState.key,
      success: false,
      message: "",
      errors: {},
    };
  }

  revalidatePath(revalidatePathString, revalidatePathType);
  return {
    key: Date.now().toString(),
    success: true,
    message: "",
    errors: {},
  };
}

export async function deleteTodoById(
  redirectUrl: string,
  todoId: string,
): Promise<void> {
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === todoId;
  });

  if (todoIndex < 0) {
    return;
  }

  todos.splice(todoIndex, 1);
  return redirect(redirectUrl);
}
