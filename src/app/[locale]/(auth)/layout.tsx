import { auth } from "@/auth";
import { redirect } from "@/i18n/routing";

export default async function AuthLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const session = await auth();
  if (session && session.user) {
    redirect("/dashboard");
  }

  const { children } = props;

  return children;
}
