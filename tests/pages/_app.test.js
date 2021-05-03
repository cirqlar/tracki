import { act, render, screen } from "@testing-library/react";
import AppShell from "../../pages/_app";
import App from "../../pages/index";

window.matchMedia = jest.fn();

document.documentElement.classList.add = jest.fn();
document.documentElement.classList.remove = jest.fn();

describe("App", () => {
  it("renders dark mode correctly", () => {
    window.matchMedia.mockImplementation(() => {
      return {
        matches: true,
      };
    });

    act(() => {
      render(<AppShell Component={App} pageProps={{}} />);
    });

    expect(document.documentElement.classList.add).toHaveBeenCalledTimes(1);
    expect(document.documentElement.classList.remove).toHaveBeenCalledTimes(0);

    window.matchMedia.mockImplementation(() => {
      return {
        matches: false,
      };
    });

    act(() => {
      render(<AppShell Component={App} pageProps={{}} />);
    });

    expect(document.documentElement.classList.add).toHaveBeenCalledTimes(1);
    expect(document.documentElement.classList.remove).toHaveBeenCalledTimes(1);

    window.matchMedia.mockImplementation(() => {
      return {
        matches: true,
      };
    });

    localStorage.setItem("theme", "light");

    act(() => {
      render(<AppShell Component={App} pageProps={{}} />);
    });

    expect(document.documentElement.classList.add).toHaveBeenCalledTimes(1);
    expect(document.documentElement.classList.remove).toHaveBeenCalledTimes(2);
  });
});
