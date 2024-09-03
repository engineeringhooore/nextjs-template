"use client";

import { useTheme } from "next-themes";
import { Select, SelectOption } from "./select";

export function ThemeSwither() {
  const { setTheme, theme } = useTheme();

  return (
    <Select
      value={theme}
      onChange={(event) => {
        setTheme(event.currentTarget.value);
      }}
    >
      <SelectOption value="dark">Dark</SelectOption>
      <SelectOption value="light">Light</SelectOption>
    </Select>
  );
}
