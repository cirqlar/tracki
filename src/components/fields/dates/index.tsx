import { format } from "date-fns";
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
		date: format(Date.now(), "dd-MM-yyyy"),
		time: format(Date.now(), "HH:mm"),
	}),
	NewThingComponent: lazy(() => import("./newThing")),
	AddMenuIcon: lazy(() => import("./addMenu")),
	AddEntryComponent: lazy(() => import("./addEntry")),
	DisplayEntryComponent: lazy(() => import("./displayEntry")),
};

export default dateField;
