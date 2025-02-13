import Dexie, { type EntityTable } from "dexie";

interface Thing {
	id: number;
	name: string;
	default_date_schema: string;
	schema: string;
	created_at: number;
	last_modified_at: number;
}

interface Entry {
	id: number;
	thing_id: number;
	created_for: number;
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
	things: "++id, &name, created_at, last_modified_at", // primary key "id" (for the runtime!)
	entries: "++id, thing_id, created_at, last_modified_at", // primary key "id" (for the runtime!)
});
db.version(2)
	.stores({
		entries: "++id, thing_id, created_for, created_at, last_modified_at", // add created for
	})
	.upgrade((tx) => {
		return tx
			.table("entries")
			.toCollection()
			.modify((entry: Entry) => {
				entry.created_for = entry.created_at;
			});
	});

db.version(3).upgrade((tx) => {
	return tx
		.table("things")
		.toCollection()
		.modify((thing: Thing) => {
			const oldSchema = JSON.parse(thing.schema) as {
				id: number;
				name: string;
				schema: string;
			}[];

			const newSchema = oldSchema.map(({ id, name, schema }) => ({
				id,
				name,
				fieldSettings: JSON.parse(schema),
			}));

			thing.schema = JSON.stringify(newSchema);
		});
});

export type { Thing, Entry };
export { db };
