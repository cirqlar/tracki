import { type DateField } from "./types";
import { lazy } from "react";

const fieldSettingsToSchemaString: DateField["fieldSettingsToSchemaString"] = (
	fieldSettings,
) => {
	return JSON.stringify(fieldSettings);
};

const dateField: DateField = {
	id: "fields/date/0001",
	friendlyName: () => "Date & Time",
	fieldSettingsToSchemaString,
	getDefaultFieldSettings: () => ({
		date: { type: "anytime" },
		time: { type: "anytime" },
	}),
	NewThingComponent: lazy(() => import("./newThing")),
	AddMenuIcon: lazy(() => import("./addMenu")),
	AddEntryComponent: lazy(() => import("./addEntry")),
	DisplayEntryComponent: lazy(() => import("./displayEntry")),
};

export default dateField;
