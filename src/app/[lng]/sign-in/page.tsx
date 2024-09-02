"use client";

import { signIn } from "@/features/auth/actions";
import type { SignInState } from "@/features/auth/types";
import { useTranslation } from "@/i18n/client";
import { useFormState } from "react-dom";

const initialState: SignInState = {
  errors: {},
};

export default function SignInPage(props: {
  params: {
    lng: string;
  };
}) {
  const lng = props.params.lng;
  const { t } = useTranslation(lng, "sign-in-page");
  const [state, action] = useFormState<SignInState, FormData>(
    signIn,
    initialState,
  );

  return (
    <form action={action}>
      <label>
        {t("username-label")}
        <input name="username" />
      </label>
      {state?.errors?.username && <p>{state.errors.username}</p>}
      <label>
        {t("password-label")}
        <input name="password" type="password" />
      </label>
      {state?.errors?.password && <p>{state.errors.password}</p>}
      <button>{t("sign-in-button")}</button>
    </form>
  );
}
