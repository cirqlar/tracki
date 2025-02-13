import { getUnixTime } from "date-fns";
import { db, Thing } from ".";

export function addThing(
	thing: Omit<Thing, "id" | "created_at" | "last_modified_at">,
) {
	console.log("Adding a thing");
	return db.things.add({
		...thing,
		created_at: getUnixTime(Date.now()),
		last_modified_at: getUnixTime(Date.now()),
	});
}

export async function checkNameExists(name: string) {
	return (await db.things.where({ name }).count()) > 0;
}

export function getThings() {
	console.log("Getting first ten things");
	return db.things.orderBy("created_at").reverse().limit(10).toArray();
}

export function getThing(id: number) {
	console.log(`Getting thing ${id}`);
	return db.things.get(id);
}
