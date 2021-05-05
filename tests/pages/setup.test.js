import { render, screen } from "@testing-library/react";

import Setup from "../../pages/setup";

describe("Setup", () => {
  it("renders correctly", () => {
    render(<Setup />);
    expect(
      screen.getByText("Set a pin")
    ).toBeInTheDocument();
  });
});