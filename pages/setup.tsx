import DefaultLayout from "../components/layout/default";

export default function Setup() {
  return (
    <DefaultLayout mainClasses="text-center">
      <img className="dark:hidden w-[60px] mx-auto pt-12" src="/logo/white-nopad.svg" alt="black tracki logo" />
      <img className="hidden dark:block w-[60px] mx-auto pt-12" src="/logo/black-nopad.svg" alt="white tracki logo" />
      <h2 className="text-2xl mt-14">Set a pin</h2>
      <p className="font-light text-xs pt-3 px-8">
        Tracki encrypts your data before saving it using your pin. <a className="text-blue-500">Learn More</a>.
      </p>
      <form className="mx-8">
        <input type="number" className="bg-gray-300 rounded h-11 w-80 max-w-full mt-4 py-2 px-4 outline-none text-black" />
        <a className="bg-green-500 rounded uppercase text-white py-2 px-4 text-xs mt-5 inline-block">Continue</a>
      </form>
    </DefaultLayout>
  );
}
