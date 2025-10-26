import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import BackIcon from "./BackIcon";

describe("BackIcon render", () => {
  it("renders with the arrow icon", () => {
    render(<BackIcon style={ undefined } callback={() => {}}/>);
    const icon = screen.getByTestId("arrow-icon");

    expect(icon).toBeInTheDocument();
  });


  it("call callback if passed", async () => {
    const handleClick = vi.fn();
    render(<BackIcon styles={ undefined } callback={handleClick}/>);

    const icon = screen.getByTestId("arrow-icon");
    await UserEvent.click(icon);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
