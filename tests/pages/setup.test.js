import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Setup from "../../pages/setup";

jest.mock("../../lib/hooks/useDatabase", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    canLogIn: false,
    signUp: () => {
      return true;
    },
  })),
}));
import useDatabase from "../../lib/hooks/useDatabase";

describe("Setup", () => {
  it("renders correctly", () => {
    render(<Setup />);
    expect(screen.getByText(/Set a pin/i)).toBeInTheDocument();
  });

  it("Accepts only numbers for pin", async () => {
    let called = false;
    useDatabase.mockImplementation(() => ({
      canLogIn: false,
      signUp: () => {
        called = true;
        return true;
      },
    }));
    render(<Setup />);
    const pinInput = screen.getByLabelText("Pin");

    expect(pinInput.value).toBe("");

    fireEvent.change(pinInput, { target: { value: "9" } });
    expect(pinInput.value).toBe("9");

    fireEvent.change(pinInput, { target: { value: "980.1" } });
    expect(pinInput.value).toBe("9");

    fireEvent.change(pinInput, { target: { value: "9182" } });
    expect(pinInput.value).toBe("9182");

    fireEvent.change(pinInput, { target: { value: "" } });
    expect(pinInput.value).toBe("");

    const submitButton = screen.getByText(/continue/i);
    fireEvent.click(submitButton);
    await waitFor(() => expect(submitButton).not.toHaveAttribute("disabled"));
    expect(called).toBe(true);
  });
});
