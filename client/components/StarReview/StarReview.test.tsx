import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import StarReview from "./StarReview";

describe("StarReview Component", () => {
  it("render the icons", () => {
    render(<StarReview count={4}/>);

    expect(screen.getAllByRole("img")[0]).toBeInTheDocument();
  });

  it("count all of the render icons", () => {
    render(<StarReview count={4}/>);

    const icons = screen.getAllByTestId("stars-icon");
    expect(icons).toHaveLength(4);
    
  });
});
