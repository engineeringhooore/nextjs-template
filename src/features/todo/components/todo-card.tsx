import { cn } from "@/lib/utils";

export type TodoCardProps = {
  note: string;
  className?: string;
  footer?: React.ReactNode;
};

export function TodoCard({ note, className, footer }: TodoCardProps) {
  return (
    <section className={cn("tw-rounded tw-border tw-p-2", className)}>
      <p>{note}</p>
      {footer}
    </section>
  );
}
