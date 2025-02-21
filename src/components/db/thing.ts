import { db, Thing } from ".";

export function addThing(
	thing: Omit<Thing, "id" | "created_at" | "last_modified_at">,
) {
	return db.things.add({
		...thing,
		created_at: new Date(),
		last_modified_at: new Date(),
	});
}

export async function checkNameExists(name: string) {
	return (await db.things.where({ name }).count()) > 0;
}

export function getThings() {
	return db.things.orderBy("created_at").reverse().limit(10).toArray();
}

export function getThing(id: number) {
	return db.things.get(id);
}
