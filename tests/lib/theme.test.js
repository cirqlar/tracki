import { changeTheme, updateTheme } from "../../lib/theme";

window.matchMedia = jest.fn();

describe("Update Theme", () => {
  describe("Using system preferences", () => {
    it("chooses light theme when user prefers", () => {
      window.matchMedia.mockImplementation(() => {
        return {
          matches: false,
        };
      });
      
      updateTheme();

      expect(document.documentElement.classList.contains("dark")).toBe(false);
    })

    it("chooses dark theme when user prefers", () => {
      window.matchMedia.mockImplementation(() => {
        return {
          matches: true,
        };
      });
      
      updateTheme();

      expect(document.documentElement.classList.contains("dark")).toBe(true);
    })
  });

  describe("Using manual selection", () => {
    it("chooses light theme when user prefers", () => {
      window.matchMedia.mockImplementation(() => {
        return {
          matches: true,
        };
      });
      localStorage.theme = "light";
      
      updateTheme();

      expect(document.documentElement.classList.contains("dark")).toBe(false);
    })

    it("chooses dark theme when user prefers", () => {
      window.matchMedia.mockImplementation(() => {
        return {
          matches: false,
        };
      });
      localStorage.theme = "dark"
      
      updateTheme();

      expect(document.documentElement.classList.contains("dark")).toBe(true);
    })
  });
})

describe("Change Theme", () => {
  it("changes to light theme correctly", () => {
    window.matchMedia.mockImplementation(() => {
      return {
        matches: true,
      };
    });
    localStorage.theme = "dark";
    
    updateTheme();
    changeTheme("light");

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  })

  it("changes to dark theme correctly", () => {
    window.matchMedia.mockImplementation(() => {
      return {
        matches: false,
      };
    });
    localStorage.theme = "light"
    
    updateTheme();
    changeTheme("dark");

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  })

  it("switches to system preferences correctly", () => {
    window.matchMedia.mockImplementation(() => {
      return {
        matches: true,
      };
    });
    localStorage.theme = "light"
    
    updateTheme();
    changeTheme("default");

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  })
});