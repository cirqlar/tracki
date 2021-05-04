import Link from "next/link";

import DefaultLayout from "../components/layout/default";

export default function Home() {
  return (
    <DefaultLayout mainClasses="flex flex-col items-center justify-center">
      <img className="dark:hidden w-[100px]" src="/logo/white-trans.svg" alt="black tracki logo" />
      <img className="hidden dark:block w-[100px]" src="/logo/black-trans.svg" alt="white tracki logo" />
      <h1 className="text-4xl">tracki</h1>
      <Link href="/setup">
        <a className="bg-green-500 rounded uppercase text-white py-2 px-4 text-base mt-5 inline-block">Begin</a>
      </Link>
      <a className="underline text-xs mt-4 font-light">Already have an account?</a>
    </DefaultLayout>
  );
}
