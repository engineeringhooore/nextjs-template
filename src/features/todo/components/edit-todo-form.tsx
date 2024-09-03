"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useTranslations } from "next-intl";
import { useFormState } from "react-dom";
import type { EditTodoState } from "../types";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type InitialValue = {
  note: string;
  attachment: string;
};

export type EditTodoFormProps = {
  className?: string;
  initialValues?: InitialValue;
  action: (
    prevState: EditTodoState,
    formData: FormData,
  ) => Promise<EditTodoState>;
};

const initialState: EditTodoState = {
  key: "",
  success: true,
  message: "",
  errors: {},
};

export function EditTodoForm({
  className,
  initialValues,
  action: actionProps,
}: EditTodoFormProps) {
  const [state, action, isPending] = useFormState(actionProps, initialState);
  const t = useTranslations("edit-todo-form");

  return (
    <form
      key={state.key}
      className={cn("tw-mb-6 tw-flex tw-w-full tw-flex-col", className)}
      action={action}
    >
      <label className="tw-mb-4 tw-flex tw-flex-col tw-items-start tw-gap-1">
        {t("edit-note-label")}
        <Input
          name="note"
          className="tw-flex-1"
          placeholder={t("edit-note-placeholder")}
          defaultValue={initialValues?.note}
          disabled={isPending}
        />
      </label>
      <div className="tw-mb-4 tw-flex tw-gap-1">
        {initialValues?.attachment && (
          <Image
            alt="To Do Attachment"
            width={200}
            height={200}
            src={initialValues.attachment}
          />
        )}
        <div>
          <label className="tw-flex tw-flex-col tw-items-start tw-gap-1">
            {t("edit-attachment-label")}
            <Input
              name="attachment"
              type="file"
              className="tw-flex-1"
              placeholder={t("edit-note-placeholder")}
              disabled={isPending}
            />
          </label>
        </div>
      </div>

      <div className="tw-flex tw-gap-1">
        <Button className="tw-flex-1" type="submit">
          {t("edit-button")}
        </Button>
      </div>
      {state?.errors?.note && (
        <p className="tw-mb-4 tw-text-start">{state.errors.note}</p>
      )}
    </form>
  );
}
