import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import ResendCode from "./ResendCode";

describe("ResendCode Component", () => {
  it("render resendcode with text", () => {
    render(<ResendCode
      text = "test"
      limit = { 10 }
      styles = {}
      callback = {}
    />)

    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("wait 10 seconds for resend code to be clickable", async () => {
    vi.useFakeTimers();
    const user = user.setup({ advanceTimers: vi.advanceTimersByTime });
    const handleClick = vi.fn();

    render(<ResendCode
      text = "test"
      limit = { 10 }
      styles = { }
      callback = { handleClick }
    />);
    const text = screen.getByText("test");

    await user.click(text);
    expect(handleClick).not.toHaveBeenCalled();

    vi.advanceTimersByTime(10000);

    await user.click(text);
    expect(handleClick).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
