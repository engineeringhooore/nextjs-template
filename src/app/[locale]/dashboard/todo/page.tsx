import { addTodo, getAllTodo } from "@/features/todo/actions";
import { AddTodoForm } from "@/features/todo/components/add-todo-form";
import { TodoCard } from "@/features/todo/components/todo-card";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function TodoPage(props: { params: { locale: string } }) {
  const locale = props.params.locale;
  const t = await getTranslations({ locale, namespace: "todo-page" });
  const todos = await getAllTodo();

  return (
    <div className="tw-mx-auto tw-max-w-[500px] tw-py-6">
      <AddTodoForm
        action={addTodo.bind(null, "/dashboard/todo", "page")}
        className="tw-mb-4"
      />
      {todos.map((todo) => {
        return (
          <TodoCard
            className="tw-mb-2 last:tw-mb-0"
            key={todo.id}
            note={todo.note}
            footer={
              <Link href={`/dashboard/todo/${todo.id}`}>
                {t("detail-link")}
              </Link>
            }
          />
        );
      })}
    </div>
  );
}
