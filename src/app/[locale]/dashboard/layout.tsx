import { auth } from "@/auth";
import { Button } from "@/components/button";
import { LangSwitcher } from "@/components/lang-switcher";
import { ThemeSwither } from "@/components/theme-switcher";
import { signOut } from "@/features/auth/actions";
import { Link, redirect } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function DashboardLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = props.params.locale;
  const t = await getTranslations({ locale, namespace: "translation" });

  const session = await auth();
  if (!session || !session.user) {
    redirect(`/sign-in`);
  }

  const { children } = props;

  return (
    <>
      <nav className="tw-gap2 tw-flex tw-border-b tw-p-4">
        <div className="tw-flex tw-flex-1 tw-items-center tw-gap-2">
          <Link href={`/dashboard`}>Home</Link>
          <Link href={`/dashboard/todo`}>To Do</Link>
        </div>
        <div className="tw-flex tw-items-center tw-gap-2">
          <LangSwitcher />
          <ThemeSwither />
          <form action={signOut.bind(null, `/sign-in`)}>
            <Button>{t("sign-out-button")}</Button>
          </form>
        </div>
      </nav>
      {children}
    </>
  );
}
