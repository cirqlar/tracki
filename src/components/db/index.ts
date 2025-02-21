import Dexie, { type EntityTable } from "dexie";

interface ThingField<T> {
	field_id: string;
	name: string;
	settings: T;

	// randomly generated unique key for use in entry
	// Problem: I want to be able to edit things but using a user defined key (name)
	// can lead to renames being hard to handle
	key: string;
}

interface Thing {
	id: number;
	name: string;

	created_at: Date;
	last_modified_at: Date;

	fields: ThingField<unknown>[];
}

interface Entry {
	id: number;
	thing_id: number;

	created_at: Date;
	last_modified_at: Date;

	created_for: Date;

	fields: { [key: string]: unknown };
}

const db = new Dexie("TrackiDatabase") as Dexie & {
	things: EntityTable<Thing, "id">;
	entries: EntityTable<Entry, "id">;
};

// Schema declaration:
db.version(1).stores({
	things: "++id, &name, created_at, last_modified_at",
	entries: "++id, thing_id, created_for, created_at, last_modified_at",
});

export type { Thing, Entry, ThingField };
export { db };
