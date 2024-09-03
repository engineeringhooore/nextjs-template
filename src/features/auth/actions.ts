"use server";

import { redirect } from "@/i18n/routing";
import {
  signIn as authSignIn,
  signOut as authSignOut,
  signInSchema,
} from "@/auth";
import type { SignInState } from "./types";

export async function signIn(
  redirectUrl: string,
  _: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const validatedFields = signInSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await authSignIn("credentials", formData);
  return redirect(redirectUrl);
}

export async function signOut(redirectUrl: string): Promise<void> {
  return await authSignOut({ redirectTo: redirectUrl, redirect: true });
}
