import { db, Entry } from ".";

export function addEntry(
	entry: Omit<Entry, "id" | "created_at" | "last_modified_at">,
) {
	return db.entries.add({
		...entry,
		created_at: new Date(),
		last_modified_at: new Date(),
	});
}

export function getEntries(thing_id: number) {
	return db.entries.where("thing_id").equals(thing_id).sortBy("created_for");
}
