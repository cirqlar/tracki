import { getUnixTime } from "date-fns";
import { db, Entry } from ".";

export function addEntry(
	entry: Omit<
		Entry,
		"id" | "created_for" | "created_at" | "last_modified_at"
	>,
	date_for: number,
) {
	return db.entries.add({
		...entry,
		created_for: date_for,
		created_at: getUnixTime(Date.now()),
		last_modified_at: getUnixTime(Date.now()),
	});
}
