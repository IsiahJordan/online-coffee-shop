import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import Button from "./Button";
import styles from "./styles.module.css";

describe("Button Components", () => {
  it("render button with text", () => {
    render(<Button label="Click Me" type="primary" onClick={() => {}} />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("set primary color to button", () => {
    render(<Button label="Click Me" type="primary" onClick={() => {}} />);
    const btn = screen.getByTestId("button");

    expect(btn).toHaveClass(styles.primary);
  });

  it("set secondary color to button", () => {
    render(<Button label="Click Me" type="secondary" onClick={() => {}} />);
    const btn = screen.getByTestId("button");
  
    expect(btn).toHaveClass(styles.secondary);
  }); 

  it("click button", async () => {
    const handleCallback = vi.fn();
    render(<Button label="Click Me" type="secondary" onClick={ handleCallback } />);

    const btn = screen.getByTestId("button");
    await UserEvent.click(btn);

    expect(handleCallback).toHaveBeenCalledTimes(1);
  });
});
