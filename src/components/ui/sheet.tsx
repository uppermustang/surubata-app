"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;
export const SheetTitle = Dialog.Title;
export const SheetDescription = Dialog.Description;

export function SheetContent({
  className,
  children,
  closeLabel,
  ...props
}: ComponentProps<typeof Dialog.Content> & { closeLabel: string }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/40" />
      <Dialog.Content
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto border-l border-border bg-background p-6 shadow-xl",
          className,
        )}
        {...props}
      >
        {children}
        <Dialog.Close
          className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-md hover:bg-muted"
          aria-label={closeLabel}
        >
          <X className="size-5" />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
