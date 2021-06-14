import { useCallback, useEffect } from "react";
import { useRouter } from "next/dist/client/router";

import useDatabase from "../lib/hooks/useDatabase";
import PinPage from "../components/pin-page";

export default function Setup() {
  const router = useRouter();
  const { signUp, canLogIn } = useDatabase();

  useEffect(() => {
    if (canLogIn) {
      console.log(router);
      router.push("/");
    }
  }, [canLogIn]);

  const submit = useCallback(async (pin: string) => {
    try {
      const hasSignedUp = await signUp(pin);
      if (hasSignedUp) {
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const Subtitle = useCallback(() => (
    <>
      Tracki encrypts your data before saving it using your pin. <a className="text-blue-500">Learn More</a>.
    </>
  ), []);

  return <PinPage title="Set a Pin" subtitle={<Subtitle />} onSubmit={submit} backButton />;
}
