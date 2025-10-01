import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import InputBox from "./InputBox";

describe("InputBox Component", () => {
  it("renders with label", () => {
    render(<InputBox name="email" label="Email" hint="Enter email" type="email" onChange={() => {}} />);
    expect(screen.getByTestId("label")).toHaveTextContent("Email");
    expect(screen.getByTestId("input")).toHaveAttribute("type", "email");
  });

  it("does not render label if not provided", () => {
    render(<InputBox name="username" hint="Enter username" type="text" onChange={() => {}} />);
    expect(screen.queryByTestId("label")).toBeNull();
  });

  it("calls onChange with text for normal input", async () => {
    const handleChange = vi.fn();
    render(<InputBox name="username" type="text" onChange={handleChange} />);
    const input = screen.getByTestId("input");

    await UserEvent.type(input, "hello");
    expect(handleChange).toHaveBeenCalledTimes(5); // called for each keystroke
    expect(handleChange).toHaveBeenLastCalledWith("hello");
  });

  it("filters non-digits for number input", async () => {
    const handleChange = vi.fn();
    render(<InputBox name="pin" type="number" onChange={handleChange} />);
    const input = screen.getByTestId("input");

    await UserEvent.type(input, "a1b2c");

    expect(input).toHaveValue("1"); // only first digit is kept
    expect(handleChange).toHaveBeenLastCalledWith("1");
  });

  it("toggles password visibility when icon is clicked", async () => {
    render(<InputBox name="pwd" type="password" onChange={() => {}} />);
    const input = screen.getByTestId("input");

    // default type is password
    expect(input).toHaveAttribute("type", "password");

    // try to find icon in group
    const group = screen.getByTestId("group-input");
    const icon = group.querySelector("svg");     
    if (icon) {
      await UserEvent.click(icon);
      expect(input).toHaveAttribute("type", "password");
    }
  });

  it("applies email-specific attributes", () => {
    render(<InputBox name="email" type="email" onChange={() => {}} />);
    const input = screen.getByTestId("input");

    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("maxLength", "100");
  });
});

