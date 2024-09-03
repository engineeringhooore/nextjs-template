import { cn } from "@/lib/utils";

export type ButtonProps = React.ComponentPropsWithoutRef<"button">;

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn("tw-rounded tw-border tw-p-1", className)}
    />
  );
}
