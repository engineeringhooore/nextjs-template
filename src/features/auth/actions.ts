"use server";

import { redirect } from "next/navigation";
import {
  signIn as authSignIn,
  signOut as authSignOut,
  signInSchema,
} from "@/auth";
import type { SignInState } from "./types";

export async function signIn(
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
  return redirect("/en/dashboard");
}

export async function signOut(): Promise<void> {
  return await authSignOut({ redirectTo: "/sign-in", redirect: true });
}
