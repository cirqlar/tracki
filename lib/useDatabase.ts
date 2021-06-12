import { useEffect, useRef } from "react";

const useDatabase = () => {
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(new URL('./database.worker.ts', import.meta.url))
  }, []);

  return {
    sendMessage: () => workerRef.current.postMessage({ a: 1 }),
  }
}

export default useDatabase;