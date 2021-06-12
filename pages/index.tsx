import DefaultLayout from "../components/layout/default";
import Button from "../components/buttons/default";
import { useEffect } from "react";
import useDatabase from "../lib/useDatabase";

export default function Index() {
  const { sendMessage } = useDatabase();
  useEffect(() => {
    sendMessage();
  }, []);

  return (
    <DefaultLayout mainClasses="flex flex-col items-center justify-center">
      <img className="dark:hidden w-[100px] sm:w-[120px] h-[100px] sm:h-[120px]" src="/logo/white-trans.svg" alt="black tracki logo" />
      <img className="hidden dark:block w-[100px] sm:w-[120px] h-[100px] sm:h-[120px]" src="/logo/black-trans.svg" alt="white tracki logo" />
      <h1 className="text-4xl sm:text-5xl">tracki</h1>
      <Button href="/setup" size="large" className="mt-5" >Begin</Button>
      <Button href="/" appearance="link" className="mt-4 font-light" >Already have an account?</Button>
    </DefaultLayout>
  );
}
