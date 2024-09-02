"use client";

import { signOut } from "@/features/auth/actions";
import { useTranslation } from "@/i18n/client";

export default function DashboardPage(props: {
  params: {
    lng: string;
  };
}) {
  const lng = props.params.lng;
  const { t } = useTranslation(lng, "dashboard-page");
  return (
    <>
      <h1>{t("title")}</h1>
      <button
        onClick={() => {
          signOut();
        }}
      >
        {t("sign-out-button")}
      </button>
    </>
  );
}
