import { LangSwitcher } from "@/components/lang-switcher";
import { ThemeSwither } from "@/components/theme-switcher";
import { signIn } from "@/features/auth/actions";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="tw-flex tw-min-h-dvh tw-flex-col tw-items-center tw-justify-center tw-text-center">
      <SignInForm action={signIn.bind(null, `/dashboard`)} />
      <div className="tw-flex tw-items-center tw-gap-2">
        <LangSwitcher />
        <ThemeSwither />
      </div>
    </div>
  );
}
