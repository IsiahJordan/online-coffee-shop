import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import Header from "./Header";

describe("Header Component", () => {
  it("render header with title", () => {
    render(<Header title="test" subtitle={ undefined }/>);

    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("render subtitle and no title", () => {
    render(<Header title={ "testing" } subtitle="test" />);

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
