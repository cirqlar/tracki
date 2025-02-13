/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field } from "@/components/fields";

type NewField = Field<string, string>;

const NewThingComponent: NewField["NewThingComponent"] = (_props) => {
	return <div>New Field New Thing</div>;
};

const AddMenuIcon: NewField["AddMenuIcon"] = (_props) => {
	return <div>New Field Add Menu</div>;
};

const AddEntryComponent: NewField["AddEntryComponent"] = (_props) => {
	return <div>New Field Add Entry</div>;
};

const DisplayEntryComponent: NewField["DisplayEntryComponent"] = (_props) => {
	return <div>New Field Display Entry</div>;
};

const newField: NewField = {
	id: "newFieldId",
	friendlyName: () => "New Field Friendly Name",
	getDefaultFieldSettings: () => "",
	getDefaultEntry: () => "",
	NewThingComponent,
	AddMenuIcon,
	AddEntryComponent,
	DisplayEntryComponent,
};

export default newField;
