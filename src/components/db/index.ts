import Dexie, { type EntityTable } from 'dexie';

interface Thing {
  id: number;
  name: string;
  schema: string;
  created_at: string;
  last_modified_at: string;
}

const db = new Dexie('TrackiDatabase') as Dexie & {
  things: EntityTable<
    Thing,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  thing: '++id, name, schema, created_at, last_modified_at' // primary key "id" (for the runtime!)
});

export type { Thing };
export { db };