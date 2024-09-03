export type SelecOptiontProps = React.ComponentPropsWithoutRef<"option">;

export function SelectOption(props: SelecOptiontProps) {
  return <option {...props} />;
}

export type SelectProps = React.ComponentPropsWithoutRef<"select">;

export function Select(props: SelectProps) {
  return <select {...props} />;
}
