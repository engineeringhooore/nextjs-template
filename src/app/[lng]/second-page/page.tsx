import { useTranslation } from "@/i18n";
import Link from "next/link";

export default async function SecondPage(props: { params: { lng: string } }) {
  const lng = props.params.lng;
  const { t } = await useTranslation(lng, "second-page");

  return (
    <main className="tw-flex tw-h-dvh tw-w-full tw-flex-col tw-items-center tw-justify-center">
      <h1>{t("title")}</h1>
      <Link href={`/${lng}`}>{t("back-to-home")}</Link>
    </main>
  );
}
