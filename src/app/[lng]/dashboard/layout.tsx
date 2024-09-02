import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout(props: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/404");
  }

  const { children } = props;
  return children;
}
