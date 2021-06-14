import { useEffect, useState } from "react";
import { ParentHandshake, RemoteHandle, WorkerMessenger } from "post-me";

import { Events, Methods } from "../database/types";

let workerReference: RemoteHandle<Methods, Events>;
const setUpWorker = async () => {
  if (workerReference) return;

  const workerRef = new Worker(new URL("../database/database.worker.ts", import.meta.url));
  const handshake = await ParentHandshake(new WorkerMessenger({ worker: workerRef }), undefined, 20, 100);
  workerReference = handshake.remoteHandle();
};

const useDatabase = () => {
  const [worker, setWorker] = useState(workerReference);
  const [canLogIn, setCanLogIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await setUpWorker();
      setWorker(workerReference);
    };
    setup();
  }, []);

  useEffect(() => {
    const initData = async () => {
      if (worker) {
        const [userAvailable, userLoggedIn] = await Promise.all([
          worker.call("userAvailable"),
          worker.call("userLoggedIn"),
        ]);
        setCanLogIn(userAvailable);
        setIsLoggedIn(userLoggedIn);
      }
    };
    initData();
  }, [worker]);

  const signUp = async (key: string) => {
    if (canLogIn) return Promise.reject("there's a user set up");

    const isSignedUp = await worker.call("signUp", key);
    if (!isSignedUp) return Promise.reject("sign up failed");

    setCanLogIn(true);
    setIsLoggedIn(true);
    return true;
  };

  const signIn = async (key: string) => {
    if (isLoggedIn) return Promise.reject("user already logged in");
    if (!canLogIn) return Promise.reject("there's no user set up");

    const isVerified = await worker.call("signIn", key);
    if (!isVerified) return Promise.reject("log in failed");

    setIsLoggedIn(true);
    return true;
  };

  return {
    canLogIn,
    isLoggedIn,
    signUp,
    signIn,
  };
};

export default useDatabase;
