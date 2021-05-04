import { render, screen } from "@testing-library/react";
import App from "../../pages/index";

jest.mock("../../styles/globals.css");

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(
      screen.getByAltText("black tracki logo")
    ).toBeInTheDocument();
  });
});