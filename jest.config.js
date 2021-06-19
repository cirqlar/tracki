module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  collectCoverage: true,
  collectCoverageFrom: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "!./pages/_app.tsx",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  moduleNameMapper: {
    "^@/pages(.*)$": "<rootDir>/pages$1",
    "^@/components(.*)$": "<rootDir>/components$1",
    "^@/lib(.*)$": "<rootDir>/lib$1",
  },
};
