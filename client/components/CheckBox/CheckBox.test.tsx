import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import CheckBox from "./CheckBox";

describe("CheckBox Component", () => {
  it("render checkbox", () => {
    render(<CheckBox name="inputbox" label="Test" onChange={() => {}} onClick={ undefined }/>);
    
    expect(screen.getByTestId("box")).toBeInTheDocument();
  });

  it("check checkbox", async () => {
    const handleCheck = vi.fn();
    render(<CheckBox name="inputbox" label="Test" onChange={ handleCheck } onClick={ undefined }/>);
    
    const box = screen.getByTestId("box");
    await UserEvent.click(box);
    await UserEvent.click(box);

    expect(handleCheck).toHaveBeenCalledTimes(2);
  });

  it("linked checkbox option", () => {
    render(<CheckBox name="inputbox" label="Test" onChange={() => {}} onClick={ vi.fn }/>);

    expect(screen.getByTestId("link")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
