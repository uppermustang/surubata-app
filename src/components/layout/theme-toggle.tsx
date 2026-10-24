"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const options = [
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
  { value: "system", icon: Monitor },
] as const;

export function ThemeToggle() {
  const t = useTranslations("theme");
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const ActiveIcon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label={t("label")}
        className="inline-flex size-11 items-center justify-center rounded-md hover:bg-muted"
      >
        {mounted ? <ActiveIcon className="size-4" /> : <Sun className="size-4" />}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-36 rounded-md border border-border bg-card p-1 text-sm shadow-lg"
        >
          <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
            {options.map((option) => {
              const Icon = option.icon;
              return (
                <DropdownMenu.RadioItem
                  key={option.value}
                  value={option.value}
                  className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 outline-none data-[highlighted]:bg-muted"
                >
                  <Icon className="size-4" aria-hidden />
                  {t(option.value)}
                </DropdownMenu.RadioItem>
              );
            })}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
