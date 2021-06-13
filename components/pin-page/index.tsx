import { useCallback, useState } from "react";

import DefaultLayout from "../layout/default";

import usePin from "../../lib/hooks/usePin";
import Button from "../buttons/default";

type PinPageProps = {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  onSubmit: (pin: string) => any;
  backButton?: boolean;
};

export default function PinPage({ title, subtitle, onSubmit, backButton }: PinPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { pin, handlePinChange } = usePin();

  const submit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const submitted = await onSubmit(pin);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
    }
  }, [pin]);

  return (
    <DefaultLayout
      mainClasses="text-center sm:flex sm:flex-col sm:items-center sm:justify-center sm:flex-auto"
      showHeader
    >
      <h2 className="text-2xl sm:text-3xl mt-14 sm:mt-0">{title}</h2>
      <p className="font-light text-xs sm:text-base pt-3 px-8">{subtitle}</p>
      <form
        className="mx-8 flex flex-col items-center"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          type="tel"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={handlePinChange}
          aria-label="Pin"
          className="bg-gray-300 rounded h-11 w-80 max-w-full mt-4 py-2 px-4 outline-none text-black"
        />
        <div>
          <Button disabled={isSubmitting} buttonType="submit" className="mt-5 inline-block">
            Continue
          </Button>
          {backButton && (
            <Button
              href="/"
              appearance="link"
              textColor="red"
              className="mt-4 sm:mt-0 sm:ml-4 font-light block sm:inline-block"
            >
              Go Back
            </Button>
          )}
        </div>
      </form>
    </DefaultLayout>
  );
}
