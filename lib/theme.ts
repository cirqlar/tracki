export function updateTheme() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export enum ThemeType {
  light = "light",
  dark = "dark",
  default = "default",
}

export function changeTheme(theme: ThemeType) {
  if (theme == "default") {
    localStorage.removeItem('theme')
  } else {
    localStorage.theme = theme;
  }
}