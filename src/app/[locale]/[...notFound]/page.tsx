import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("not-found-page");

  return (
    <div className="tw-flex tw-min-h-dvh tw-items-center tw-justify-center tw-text-center">
      <div>
        <h1 className="tw-mr-5 tw-inline-block tw-border-r-2 tw-pr-6 tw-align-top tw-text-2xl tw-font-medium">
          {t("title")}
        </h1>
        <p className="tw-m-0 tw-inline-block tw-text-sm">{t("description")}</p>
      </div>
    </div>
  );
}
