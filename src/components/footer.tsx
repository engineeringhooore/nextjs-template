import { useTranslation } from "@/i18n";
import { FooterBase } from "./footer-base";

export type FooterProps = { lng: string; path?: string };

export async function Footer({ lng, path }: FooterProps) {
  const { i18n } = await useTranslation(lng, "footer");
  return <FooterBase i18n={i18n} lng={lng} path={path} />;
}
