"use client";

import { FooterClient } from "@/components/footer-client";
import { Header } from "@/components/header";
import { useTranslation } from "@/i18n/client";
import Link from "next/link";

export default function SecondClientPage(props: {
  params: {
    lng: string;
  };
}) {
  const lng = props.params.lng;
  const { t } = useTranslation(lng, "second-client-page");
  return (
    <>
      <main>
        <Header heading={t("h1")} />
        <Link href={`/${lng}`}>
          <button type="button">{t("back-to-home")}</button>
        </Link>
      </main>
      <FooterClient lng={lng} path="/second-client-page" />
    </>
  );
}
