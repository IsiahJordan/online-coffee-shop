import { render, screen, act } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import ResendCode from "./ResendCode";

describe("ResendCode Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("render resendcode with text", () => {
    render(<ResendCode
      text = "test"
      limit = { 10 }
      styles = { { "timer": { }, "resend-timer": { }, "reset": { } } }
      callback = { undefined }
    />);

    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("wait 10 seconds for resend code to be clickable", () => {

    render(
      <ResendCode
        text = "test"
        limit = { 3 }
        styles = {{ timer: {}, "resend-timer": {}, reset: {} }}
        callback = { vi.fn }
      />
    );

    const btn = screen.getByTestId("resend-btn");
    expect(btn).toHaveAttribute("data-form", "wait");

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(btn).toHaveAttribute("data-form", "reset");

    });
});
