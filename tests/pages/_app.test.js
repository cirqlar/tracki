import { act, render } from "@testing-library/react";

import App from "../../pages/_app";
import Index from "../../pages/index";

window.matchMedia = jest.fn();

describe("App", () => {
  it("renders app correctly", () => {
    window.matchMedia.mockImplementation(() => {
      return {
        matches: true,
      };
    });

    act(() => {
      render(<App Component={Index} pageProps={{}} />);
    });

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
