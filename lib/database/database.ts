import Dexie from "dexie";

export class TrackiDatabase extends Dexie {
  trackers: Dexie.Table<ITracker, string>;
  entries: Dexie.Table<IEntry, string>;
  previousPins: Dexie.Table<IPin, string>;
  testPhrase: Dexie.Table<IPhrase, number>;

  constructor() {
    super("TrackiDatabase");

    this.version(1).stores({
      trackers: '&uuid, name, createdAt, updatedAt',
      entries: '&uuid, trackerUUID, createdAt, updatedAt',
      previousPins: '&uuid, createdAt',
      testPhrase: '++id',
    });

    this.trackers = this.table('trackers')
    this.entries = this.table('entries')
    this.previousPins = this.table('previousPins')
    this.testPhrase = this.table('testPhrase');
  }
}

export interface ITracker {
  uuid: string,
  createdAt: Date,
  updatedAt: Date,
  name: string,
  structure: string,
}

export interface IEntry {
  uuid: string,
  createdAt: Date,
  updatedAt: Date,
  trackerUUID: string,
  JSON: string,
}

export interface IPin {
  uuid: string,
  createdAt: Date,
  pin: string,
}

export interface IPhrase {
  id?: number,
  phrase: string,
  encryptedPhrase?: string,
}

const db = new TrackiDatabase();

db.on('populate', () => {
  db.testPhrase.add({ id: 1, phrase: "The brown fox" });
})

export async function database() {
  const openedDB = await db.open();
  return openedDB;
}
