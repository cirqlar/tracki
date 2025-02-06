import { type DateField } from "./types";
import { lazy } from "react";

const friendlyName: DateField["friendlyName"] = () => {
	return "Date & Time";
};

const fieldSettingsToSchemaString: DateField["fieldSettingsToSchemaString"] = (
	fieldSettings,
) => {
	return JSON.stringify(fieldSettings);
};

const dateField: DateField = {
	id: "fields/date/0001",
	friendlyName,
	fieldSettingsToSchemaString,
	NewThingComponent: lazy(() => import("./newThing")),
	AddMenuIcon: lazy(() => import("./addMenu")),
	AddEntryComponent: lazy(() => import("./addEntry")),
	DisplayEntryComponent: lazy(() => import("./displayEntry")),
};

export default dateField;
