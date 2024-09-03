"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useTranslations } from "next-intl";
import { useFormState } from "react-dom";
import type { AddTodoState } from "../types";
import { cn } from "@/lib/utils";

export type AddTodoFormProps = {
  className?: string;
  action: (
    prevState: AddTodoState,
    formData: FormData,
  ) => Promise<AddTodoState>;
};

const initialState: AddTodoState = {
  key: "",
  success: true,
  message: "",
  errors: {},
};

export function AddTodoForm({
  className,
  action: actionProps,
}: AddTodoFormProps) {
  const [state, action, isPending] = useFormState(actionProps, initialState);

  const t = useTranslations("add-todo-form");
  return (
    <form
      key={state.key}
      className={cn("tw-flex tw-gap-1", className)}
      action={action}
    >
      <Input
        name="note"
        className="tw-flex-1"
        placeholder={t("add-todo-placeholder")}
        disabled={isPending}
      />
      <Button disabled={isPending}>{t("add-button")}</Button>
      {state?.errors?.note && (
        <p className="tw-mb-4 tw-text-start">{state.errors.note}</p>
      )}
    </form>
  );
}
