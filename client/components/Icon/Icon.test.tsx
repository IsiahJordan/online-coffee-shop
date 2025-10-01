import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import Icon from "./Icon";
import { IconEnum } from "@/types/icon";

describe("Icon Component", () => {
  it("render all icons", () => {
    render(<Icon 
      option = { IconEnum.ARROW } 
      toggle = { undefined } 
      type = "icon"
      styles = { undefined }
      onClick = { undefined }
    />);

    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();

    render(<Icon 
      option = { IconEnum.MAIL } 
      toggle = { undefined } 
      type = "icon"
      styles = { undefined }
      onClick = { undefined }
    />);

    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();

    render(<Icon 
      option = { IconEnum.LOCK } 
      toggle = { undefined } 
      type = "icon"
      styles = { undefined }
      onClick = { undefined }
    />);

    expect(screen.getByTestId("lock-icon")).toBeInTheDocument();

    render(<Icon 
      option = { IconEnum.NEYE } 
      toggle = { undefined } 
      type = "icon"
      styles = { undefined }
      onClick = { undefined }
    />);

    expect(screen.getByTestId("neye-icon")).toBeInTheDocument();

    render(<Icon 
      option = { IconEnum.EYE } 
      toggle = { undefined } 
      type = "icon"
      styles = { undefined }
      onClick = { undefined }
    />);

    expect(screen.getByTestId("eye-icon")).toBeInTheDocument();
  });

  it("create icon only icon", () => {
    render(<Icon 
      option = { IconEnum.ARROW } 
      toggle = { undefined } 
      type = "icon"
      styles = { undefined }
      onClick = { vi.fn }
    />);

    const btn = screen.queryByTestId("icon-btn");
    expect(btn).not.toBeInTheDocument();
  })

  it("click button icon", async () => {
    const handleClick = vi.fn();
    render(<Icon 
      option = { IconEnum.ARROW } 
      toggle = { undefined } 
      type = "button"
      styles = { undefined }
      onClick = { handleClick }
    />);
    
    const btn = screen.getByTestId("icon-btn");
    await UserEvent.click(btn);

    expect(handleClick).toHaveBeenCalled();
  })

  it("change icon by toggle", async () => {
    const handleClick = vi.fn;
    render(<Icon 
      option = { IconEnum.ARROW } 
      toggle = { IconEnum.MAIL } 
      type = "button"
      styles = { undefined }
      onClick = { handleClick }
    />);
    
    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();

    const btn = screen.getByTestId("icon-btn");
    await UserEvent.click(btn);

    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
  })

});
