export type Methods = {
  userAvailable: () => Promise<boolean>;
  signUp: (pin: string) => Promise<boolean>;
  verifyPin: (pin: string) => Promise<boolean>;
}

export type Events = {
  ready: boolean;
}