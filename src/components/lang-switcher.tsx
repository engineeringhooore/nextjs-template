"use client";

import { Link, usePathname } from "@/i18n/routing";

export function LangSwitcher() {
  const pathname = usePathname();

  return (
    <>
      <Link href={pathname} locale="en">
        en
      </Link>
    </>
  );
}
