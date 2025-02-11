import { getUnixTime } from "date-fns";
import { db, Thing } from ".";

export function addThing(
	thing: Omit<Thing, "id" | "created_at" | "last_modified_at">,
) {
	return db.things.add({
		...thing,
		created_at: getUnixTime(Date.now()),
		last_modified_at: getUnixTime(Date.now()),
	});
}

export function getThings() {
	return db.things.orderBy("created_at").reverse().limit(10).toArray();
}

export function getThing(id: number) {
	return db.things.get(id);
}
