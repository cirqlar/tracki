export type Methods = {
  userAvailable: () => Promise<boolean>;
  userLoggedIn: () => Promise<boolean>;
  signUp: (pin: string) => Promise<boolean>;
  signIn: (pin: string) => Promise<boolean>;
}

export type Events = {
  ready: boolean;
}