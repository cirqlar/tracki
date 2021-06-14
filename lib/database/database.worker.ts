import { ChildHandshake, LocalHandle, WorkerMessenger } from "post-me";
import AES from 'crypto-js/aes';
import utf8 from 'crypto-js/enc-utf8';

import { database, TrackiDatabase } from "./database";
import { Events, Methods } from "./types";


// Replace with viable encryption
let key: string;
async function encrypt(data: string, key: string) {
  return AES.encrypt(data, key).toString();
}
async function decrypt(data: string, key: string) {
  return AES.decrypt(data, key).toString(utf8);
}

async function DatabaseWorker() {
  const ctx: Worker = self as any;
  const db = (await database()) as TrackiDatabase;

  const functions: Methods = {
    async userAvailable() {
      const testPhrase = await db.testPhrase.get(1);    
      return testPhrase.encryptedPhrase ? true : false;
    },
    async userLoggedIn() {
      return key ? true : false;
    },
    async signUp(pin: string) {
      if (await functions.userAvailable()) return false;
      const testPhrase = await db.testPhrase.get(1);
      console.log("here we are", testPhrase);

      const encryptedPhrase = await encrypt(testPhrase.phrase, pin);
      testPhrase.encryptedPhrase = encryptedPhrase;

      const dbKey = await db.testPhrase.put(testPhrase);
      key = pin;

      return true;
    },
    async signIn(pin: string) {
      if (!(await functions.userAvailable())) return false;
      const testPhrase = await db.testPhrase.get(1);

      const decryptedPhrase = await decrypt(testPhrase.encryptedPhrase, pin);
      const isValid = (decryptedPhrase === testPhrase.phrase);
      key = isValid ? pin : key;

      return isValid
    },
  };

  const connection = await ChildHandshake(new WorkerMessenger({ worker: ctx }), functions);
  let localHandle: LocalHandle<Methods, Events> = connection.localHandle();

  ctx.addEventListener("message", async ({ data, ...event }) => {
    console.log(data);
  });
}

DatabaseWorker();

export {};
