import { fireEvent, render, screen } from "@testing-library/react";

import Setup from "../../pages/setup";

describe("Setup", () => {
  it("renders correctly", () => {
    render(<Setup />);
    expect(
      screen.getByText("Set a pin")
    ).toBeInTheDocument();
  });

  it("Accepts only numbers for pin", () => {
    render(<Setup />);
    const pinInput = screen.getByLabelText("Pin");

    expect(
      pinInput.value
    ).toBe("");

    fireEvent.change(pinInput, { target: { value: "9" } });
    expect(
      pinInput.value
    ).toBe("9");

    fireEvent.change(pinInput, { target: { value: "980.1" } });
    expect(
      pinInput.value
    ).toBe("9");

    fireEvent.change(pinInput, { target: { value: "9182" } });
    expect(
      pinInput.value
    ).toBe("9182");

    fireEvent.change(pinInput, { target: { value: "" } });
    expect(
      pinInput.value
    ).toBe("");
  })
});