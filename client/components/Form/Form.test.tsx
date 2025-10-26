import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import Form from "./Form";

describe("Form component", () => {
  const names = ["username", "password"];
  const labels = ["User Name", "Password"];
  const hints = ["Enter your name", "Enter your password"];
  const types = ["text", "password"];

  let onChanges: ReturnType<typeof vi.fn>[];

  beforeEach(() => {
    // create mock functions for each onChange
    onChanges = names.map(() => vi.fn());
  });

  it("renders all InputBox fields", () => {
    render(<Form names={names} labels={labels} hints={hints} types={types} onChanges={onChanges} />);

    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    expect(screen.getAllByTestId("input")).toHaveLength(2);
  });

  it("passes down placeholder text correctly", () => {
    render(<Form names={names} labels={labels} hints={hints} types={types} onChanges={onChanges} />);
    hints.forEach((hint) => {
      expect(screen.getByPlaceholderText(hint)).toBeInTheDocument();
    });
  });

  it("calls onChange for each input", async () => {
    const user = UserEvent.setup();
    render(<Form names={names} labels={labels} hints={hints} types={types} onChanges={onChanges} />);

    const inputs = screen.getAllByTestId("input");

    await user.type(inputs[0], "Alice");
    await user.type(inputs[1], "secret");

    expect(onChanges[0]).toHaveBeenCalledWith("Alice");
    expect(onChanges[1]).toHaveBeenCalledWith("secret");
  });

  it("renders nothing if arrays are empty", () => {
    render(<Form names={[]} labels={[]} hints={[]} types={[]} onChanges={[]} />);
    expect(screen.queryAllByTestId("input")).toHaveLength(0);
  });
});
