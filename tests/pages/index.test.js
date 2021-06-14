import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Index from "../../pages/index";

jest.mock("../../lib/hooks/useDatabase", () => ({
  __esModule: true,
  default: jest.fn(),
}))
import useDatabase from "../../lib/hooks/useDatabase";

describe("Home", () => {
  it("renders correctly", () => {
    useDatabase.mockImplementation(() => ({
      canLogIn: false,
      isLoggedIn: false,
      signIn: () => { return true },
    }));
    render(<Index />);
    expect(
      screen.getByText("tracki")
    ).toBeInTheDocument();
  });

  it("renders correctly when can log in", async () => {
    let called = false;
    useDatabase.mockImplementation(() => ({
      canLogIn: true,
      isLoggedIn: false,
      signIn: () => {
        called = true;
        return true;
      },
    }));
    render(<Index />);
    expect(
      screen.getByText("Log in")
    ).toBeInTheDocument();
    
    const submitButton = screen.getByText(/continue/i);
    fireEvent.click(submitButton);
    await waitFor(() => expect(submitButton).not.toHaveAttribute('disabled'));
    expect(called).toBe(true);
  })

  it("renders correctly when is logged in", () => {
    useDatabase.mockImplementation(() => ({
      canLogIn: true,
      isLoggedIn: true,
      signIn: () => {},
    }));
    render(<Index />);
    expect(
      screen.getByText("Nothing")
    ).toBeInTheDocument();
  })
});