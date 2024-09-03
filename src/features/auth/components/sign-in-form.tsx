"use client";

import { useTranslations } from "next-intl";
import type { SignInState } from "../types";
import { useFormState } from "react-dom";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

const initialState: SignInState = {
  errors: {},
};

export type SignInFormProps = {
  action: (prevState: SignInState, formData: FormData) => Promise<SignInState>;
};

export function SignInForm({ action: actionProps }: SignInFormProps) {
  const t = useTranslations("sign-in-form");
  const [state, action, isPending] = useFormState<SignInState, FormData>(
    actionProps,
    initialState,
  );

  return (
    <form action={action} className="tw-flex tw-w-full tw-flex-col">
      <label className="tw-mb-4 tw-flex tw-flex-col tw-items-start tw-gap-1">
        {t("username-label")}
        <Input name="username" disabled={isPending} />
      </label>
      {state?.errors?.username && (
        <p className="tw-mb-4">{state.errors.username}</p>
      )}
      <label className="tw-mb-4 tw-flex tw-flex-col tw-items-start tw-gap-1">
        {t("password-label")}
        <Input name="password" type="password" disabled={isPending} />
      </label>
      {state?.errors?.password && (
        <p className="tw-mb-4">{state.errors.password}</p>
      )}
      <Button disabled={isPending}>{t("sign-in-button")}</Button>
    </form>
  );
}
