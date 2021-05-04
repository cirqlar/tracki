import { act, render, screen } from "@testing-library/react";
import AppShell from "../../pages/_app";
import App from "../../pages/index";

window.matchMedia = jest.fn();

describe("App", () => {
  it("renders app correctly", () => {
    window.matchMedia.mockImplementation(() => {
      return {
        matches: true,
      };
    });

    act(() => {
      render(<AppShell Component={App} pageProps={{}} />);
    });

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
