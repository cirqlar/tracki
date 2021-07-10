export const updateTheme = () => {
  if (
    localStorage.theme === "dark"
    || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export function changeTheme(theme: "default" | "dark" | "light") {
  if (theme === "default") {
    localStorage.removeItem("theme");
  } else {
    localStorage.theme = theme;
  }
  updateTheme();
}
