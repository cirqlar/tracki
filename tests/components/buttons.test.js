import { fireEvent, render, screen, cleanup } from "@testing-library/react";

import Button from "../../components/buttons/default";
import { backgroundColors, textColors } from "../../lib/colors";

jest.mock("next/link", () => ({
  __esModule: true,
  default: jest.fn(({ href, children }) => (
    <span data-href={href} data-testid="LinkComponent">
      {children}
    </span>
  )),
}));

describe("Buttons", () => {
  describe("default", () => {
    it("should render properly", () => {
      render(<Button buttonType="submit">Text</Button>);

      expect(screen).toMatchSnapshot();
    });

    it("should pick the right color", () => {
      render(
        <Button buttonType="submit" bgColor="green" textColor="blue">
          Text
        </Button>
      );

      const button = screen.getByText("Text");
      expect(button.classList.contains(backgroundColors["green"])).toBe(true);
      expect(button.classList.contains(textColors["blue"])).toBe(true);
    });

    it("should call onClick", () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick}>Text</Button>);

      expect(onClick).not.toHaveBeenCalled();

      const button = screen.getByText("Text");
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Links", () => {
  describe("default", () => {
    it("should render properly", () => {
      render(<Button href="/href">Text</Button>);

      expect(screen).toMatchSnapshot();

      cleanup();

      render(
        <Button href="/href" appearance="link">
          Text
        </Button>
      );

      expect(screen).toMatchSnapshot();

      cleanup();

      render(
        <Button href="/href" size='large'>
          Text
        </Button>
      );
      const link = screen.getByText("Text");
      expect(link.classList.contains("text-lg")).toBe(true);
      expect(link.classList.contains("sm:text-xl")).toBe(true);
    });

    it("should only use Link component when internal is true", () => {
      render(<Button href="/href">Text</Button>);
      expect(screen.getByTestId("LinkComponent")).toBeInTheDocument();

      cleanup();

      render(<Button href="/href" internal>Text</Button>);
      expect(screen.getByTestId("LinkComponent")).toBeInTheDocument();

      cleanup();

      render(<Button href="/href" internal={false}>Text</Button>);
      expect(screen.queryByTestId("LinkComponent")).not.toBeInTheDocument();
    })
  });
});
