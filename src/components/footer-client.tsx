"use client";

import { useTranslation } from "@/i18n/client";
import { FooterBase } from "./footer-base";

export type FooterClientProps = { lng: string; path: string };

export function FooterClient({ lng, path }: FooterClientProps) {
  const { i18n } = useTranslation(lng, "footer");
  return <FooterBase i18n={i18n} lng={lng} path={path} />;
}

// if you like to avoid prop drilling, you can do so with useParams()
// import { useParams } from 'next/navigation'
// export function Footer({ path }: {
//   path: string;
// }) {
//   const params = useParams<{ lng: string; }>()
//   const { i18n } = useTranslation(params.lng, 'footer')
//   return <FooterBase i18n={i18n} lng={params.lng} path={path} />
// }
