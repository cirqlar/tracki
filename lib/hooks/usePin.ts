import { useCallback, useState } from "react";

export default function usePin() {
  const [pin, setPin] = useState("");

  const handlePinChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d+$/.test(event.target.value) || event.target.value == "") {
      setPin(event.target.value);
    }
  }, []);

  return {
    pin,
    handlePinChange,
  };
}
