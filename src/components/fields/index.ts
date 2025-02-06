import dateField from "./dates";
import optionsField from "./options";
import rangeField from "./ranges";
import textField from "./text";

interface FieldNewThingProps<T> {
	fieldSettings?: T;
	updateFieldData: (fieldSettings?: T) => unknown;
}

interface FieldAddEntryProps {
	schema: string;
}

interface FieldDisplayEntryProps {
	schema: string;
	info: string;
}

export interface Field<T> {
	id: string;
	friendlyName: () => string;
	fieldSettingsToSchemaString: (fieldSettings?: T) => string;
	NewThingComponent: (props: FieldNewThingProps<T>) => React.ReactNode;
	AddMenuIcon: (props: unknown) => React.ReactNode;
	AddEntryComponent: (props: FieldAddEntryProps) => React.ReactNode;
	DisplayEntryComponent: (props: FieldDisplayEntryProps) => React.ReactNode;
}

export const FIELDS = {
	[dateField.id]: dateField,
	[textField.id]: textField,
	[rangeField.id]: rangeField,
	[optionsField.id]: optionsField,
} as { [key: string]: Field<unknown> };
