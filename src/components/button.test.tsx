import { setup, screen } from "@/test-utils";
import { Button } from "./button";

test("loads and displays hi button", () => {
  setup(<Button>Hi</Button>);
  expect(screen.getByRole("button")).toHaveTextContent("Hi");
});

test("hi button clickable", async () => {
  const onClick = vi.fn();
  const { user } = setup(<Button onClick={onClick}>Hi</Button>);

  const hiButton = screen.getByRole("button", { name: "Hi" });
  expect(hiButton).toBeEnabled();

  await user.click(hiButton);
  expect(onClick).toBeCalled();
});
