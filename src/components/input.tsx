import { cn } from "@/lib/utils";

export type InputProps = React.ComponentPropsWithoutRef<"input">;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn("tw-w-full tw-rounded tw-border tw-p-1", className)}
    />
  );
}
