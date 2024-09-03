import { Button } from "@/components/button";
import {
  deleteTodoById,
  editTodoById,
  getTodoById,
} from "@/features/todo/actions";
import { EditTodoForm } from "@/features/todo/components/edit-todo-form";
import { redirect } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function TodoDetailPage(props: {
  params: { todoId: string; locale: string };
}) {
  const { todoId, locale } = props.params;
  const t = await getTranslations({ locale, namespace: "todo-detail-page" });
  const todo = await getTodoById(todoId);

  if (!todo) {
    return redirect("/not-found");
  }

  return (
    <div className="tw-mx-auto tw-max-w-[500px] tw-py-6">
      <div className="tw-mb-4 tw-flex tw-justify-end">
        <form action={deleteTodoById.bind(null, `/dashboard/todo`, todo.id)}>
          <Button>{t("delete-button")}</Button>
        </form>
      </div>
      <EditTodoForm
        action={editTodoById.bind(null, "/dashboard/todo", "layout", todo.id)}
        initialValues={{
          note: todo.note,
          attachment: todo.attachment,
        }}
      />
    </div>
  );
}
