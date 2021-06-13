import React, { useCallback } from "react";

import DefaultLayout from "../components/layout/default";
import Button from "../components/buttons/default";

import useDatabase from "../lib/hooks/useDatabase";
import PinPage from "../components/pin-page";
import Dashboard from "../components/dashboard";

export default function Index() {
  const { canLogIn, isLoggedIn, signIn } = useDatabase();

  const submit = useCallback(async (pin: string) => {
    try {
      console.log(canLogIn);
      const isVerified = await signIn(pin);
      if (isVerified) {
        console.log("that worked");
      }
    } catch (e) {
      console.log(e);
    }
  }, [canLogIn]);

  return isLoggedIn ? (
    <Dashboard />
  ) : canLogIn ? (
    <PinPage title="Log in" subtitle="Log in now?" onSubmit={submit} />
  ) : (
    <DefaultLayout mainClasses="flex flex-col items-center justify-center">
      <img
        width="120"
        height="120"
        className="dark:hidden w-[100px] sm:w-[120px] h-[100px] sm:h-[120px]"
        src="/logo/white-trans.svg"
        alt="black tracki logo"
      />
      <img
        width="120"
        height="120"
        className="hidden dark:block w-[100px] sm:w-[120px] h-[100px] sm:h-[120px]"
        src="/logo/black-trans.svg"
        alt="white tracki logo"
      />
      <h1 className="text-4xl sm:text-5xl">tracki</h1>
      <Button href="/setup" size="large" className="mt-5">
        Begin
      </Button>
      <Button href="/" appearance="link" className="mt-4 font-light">
        Already have an account?
      </Button>
    </DefaultLayout>
  );
}
