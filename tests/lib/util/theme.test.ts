import { updateTheme, changeTheme } from "@/lib/util/theme";

let mediaReturn = false;
window.matchMedia = jest.fn(() => ({
  matches: mediaReturn,
})) as unknown as (query: string) => MediaQueryList;

describe("updateTheme", () => {
  it("should choose right theme with matchMedia", () => {
    mediaReturn = false;
    updateTheme();
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    mediaReturn = true;

    updateTheme();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  })

  it("should choose the right theme with localStorage", () => {
    mediaReturn = false;
    localStorage.setItem("theme", "dark");
    updateTheme();
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    mediaReturn = true;
    localStorage.setItem("theme", "light");
    updateTheme();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  })
})

describe("changeTheme", () => {
  it("should change to dark", () => {
    mediaReturn = false;
    localStorage.removeItem("theme");
    updateTheme();

    changeTheme("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it("should change to light", () => {
    mediaReturn = true;
    localStorage.removeItem("theme");
    updateTheme();

    changeTheme("light");
    expect(localStorage.getItem("theme")).toBe("light");
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it("should remove theme properly", () => {
    mediaReturn = true;
    localStorage.setItem("theme", "light");
    updateTheme();

    changeTheme("default");
    expect(localStorage.getItem("theme")).toBeNull();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  })
})