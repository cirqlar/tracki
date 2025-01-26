import Dexie, { type EntityTable } from "dexie";

interface Thing {
	id: number;
	name: string;
	schema: string;
	created_at: number;
	last_modified_at: number;
}

interface Entry {
	id: number;
	thing_id: number;
	created_at: number;
	last_modified_at: number;
	entry_infromation: string;
}

const db = new Dexie("TrackiDatabase") as Dexie & {
	things: EntityTable<
		Thing,
		"id" // primary key "id" (for the typings only)
	>;
	entries: EntityTable<Entry, "id">;
};

// Schema declaration:
db.version(1).stores({
	thing: "++id, &name, created_at, last_modified_at", // primary key "id" (for the runtime!)
	entries: "++id, thing_id, created_at, last_modified_at", // primary key "id" (for the runtime!)
});

export type { Thing, Entry };
export { db };
