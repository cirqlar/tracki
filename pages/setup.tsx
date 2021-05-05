import React, { useState } from "react";

import DefaultLayout from "../components/layout/default";

export default function Setup() {
  const [pin, setPin] = useState("");

  const handlePinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d+$/.test(event.target.value)) {
      setPin(event.target.value);
    }
  };

  return (
    <DefaultLayout
      mainClasses="text-center sm:flex sm:flex-col sm:items-center sm:justify-center sm:flex-auto"
      showHeader
    >
      <h2 className="text-2xl sm:text-3xl mt-14 sm:mt-0">Set a pin</h2>
      <p className="font-light text-xs sm:text-base pt-3 px-8">
        Tracki encrypts your data before saving it using your pin. <a className="text-blue-500">Learn More</a>.
      </p>
      <form className="mx-8 flex flex-col items-center">
        <input
          type="tel"
          inputMode="numeric"
          pattern="^[0–9]$"
          maxLength={6}
          value={pin}
          onChange={handlePinChange}
          aria-label="Pin"
          className="bg-gray-300 rounded h-11 w-80 max-w-full mt-4 py-2 px-4 outline-none text-black"
        />
        <button
          type="submit"
          className="bg-green-500 rounded uppercase text-white py-2 px-4 text-xs sm:text-base mt-5 inline-block"
        >
          Continue
        </button>
      </form>
    </DefaultLayout>
  );
}
