import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ALink from "./ALink";

describe("ALink Component", () => {
  it("renders with the given label", () => {
    render(<ALink label="Click Me" />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<ALink label="Forget Password?" onClick={handleClick} />);

    const link = screen.getByRole("link", { name: /forget password/i });
    await userEvent.click(link);

    expect(handleClick).toHaveBeenCalled();
  });
});
