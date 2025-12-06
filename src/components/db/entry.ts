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

export interface DatePagination {
	after?: Date;
	before?: Date;
	count?: number;
}

export function getEntriesByDate(thing_id: number, pagination: DatePagination) {
	if (pagination.after && pagination.before) {
		const q = db.entries
			.where("[thing_id+created_for]")
			.between(
				[thing_id, pagination.after],
				[thing_id, pagination.before],
			);

		return pagination.count
			? q.limit(pagination.count).toArray()
			: q.toArray();
	} else if (pagination.after) {
		const q = db.entries
			.where("[thing_id+created_for]")
			.aboveOrEqual([thing_id, pagination.after]);

		return pagination.count
			? q.limit(pagination.count).toArray()
			: q.toArray();
	} else if (pagination.before) {
		const q = db.entries
			.where("[thing_id+created_for]")
			.below([thing_id, pagination.before]);

		return pagination.count
			? q.limit(pagination.count).toArray()
			: q.toArray();
	} else if (pagination.count) {
		return db.entries
			.where("thing_id")
			.equals(thing_id)
			.limit(pagination.count)
			.toArray();
	}

	return db.entries.where("thing_id").equals(thing_id).toArray();
}
