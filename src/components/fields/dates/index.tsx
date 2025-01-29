import { Field } from "@/components/fields";
import TrackiTransparent from "@/components/icons/logo-trans-nopad";

interface DateSettings {
	red: boolean;
}

type DateField = Field<DateSettings>;

const friendlyName: DateField["friendlyName"] = (variant) => {
	switch (variant) {
		case "date-only":
			return "Date";
		case "time-only":
			return "Time";
		case "default":
		default:
			return "Date & Time";
	}
};

const fieldSettingsToSchemaString: DateField["fieldSettingsToSchemaString"] = (
	fieldSettings,
) => {
	return JSON.stringify(fieldSettings);
};

const NewThingComponent: DateField["NewThingComponent"] = (props) => {
	switch (props.variant) {
		case "default":
			return (
				<div>
					<TrackiTransparent />
					<p>Date & Time</p>
				</div>
			);
		case "date-only":
			return (
				<div>
					<TrackiTransparent />
					<p>Date</p>
				</div>
			);
		case "time-only":
			return (
				<div>
					<TrackiTransparent />
					<p>Time</p>
				</div>
			);

		default:
			console.error(
				`Error: Unhandled component variant ${props.variant}`,
			);
			return <div>Error, Unhandled component</div>;
	}
};

const AddMenuIcon: DateField["AddMenuIcon"] = (props) => {
	switch (props.variant) {
		case "default":
			return <TrackiTransparent className="h-full" />;
		case "date-only":
			return <TrackiTransparent className="h-full" />;
		case "time-only":
			return <TrackiTransparent className="h-full" />;
		default:
			console.error(
				`Error: Unhandled component variant ${props.variant}`,
			);
			return <div>Error, Unhandled component</div>;
	}
};

const AddEntryComponent: DateField["AddEntryComponent"] = (props) => {
	return <div>Date Add Entry {props.schema}</div>;
};

const DisplayEntryComponent: DateField["DisplayEntryComponent"] = (props) => {
	return <div>Date Display Entry {props.schema}</div>;
};

const dateField: DateField = {
	id: "fields/date/0001",
	friendlyName,
	variants: ["default", "date-only", "time-only"],
	fieldSettingsToSchemaString,
	NewThingComponent,
	AddMenuIcon,
	AddEntryComponent,
	DisplayEntryComponent,
};

export default dateField as Field<unknown>;
