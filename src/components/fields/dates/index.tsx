import { type DateField } from "./types";
import { lazy } from "react";

const dateField: DateField = {
	id: "fields/date/0001",
	friendlyName: () => "Date & Time",
	getDefaultFieldSettings: () => ({
		date: { type: "anytime" },
		time: { type: "anytime" },
	}),
	getDefaultEntry: () => ({
		date: new Date(),
	}),
	NewThingComponent: lazy(() => import("./newThing")),
	AddMenuIcon: lazy(() => import("./addMenu")),
	AddEntryComponent: lazy(() => import("./addEntry")),
	DisplayEntryComponent: lazy(() => import("./displayEntry")),
};

export default dateField;
