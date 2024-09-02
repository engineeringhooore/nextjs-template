import { Inter } from "next/font/google";
import { dir } from "i18next";
import { ThemeProvider } from "@/components/theme-provider";
import { fallbackLng, languages } from "../../i18n/settings";
import { useTranslation } from "@/i18n";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return languages.map((lng) => {
    return { lng };
  });
}

export async function generateMetadata(props: {
  params: {
    lng: string;
  };
}) {
  let lng = props.params.lng;
  if (languages.indexOf(lng) < 0) {
    lng = fallbackLng;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);
  return {
    title: t("title"),
    content:
      "A playground to explore new Next.js 13/14 app directory features such as nested layouts, instant loading states, streaming, and component level data fetching.",
  };
}

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { lng: string };
  }>,
) {
  const { children, params } = props;
  const { lng } = params;
  return (
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
