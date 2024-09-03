import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  return (
    <div className="tw-flex tw-min-h-dvh tw-items-center tw-justify-center tw-text-center">
      <div>
        <h1>{t("title")}</h1>
      </div>
    </div>
  );
}
