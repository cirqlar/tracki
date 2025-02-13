import dateField from "./dates";
import optionsField from "./options";
import rangeField from "./ranges";
import textField from "./text";

interface FieldNewThingProps<T> {
	defaultFieldSettings: T;
	updateFieldSettings: (fieldSettings: T) => unknown;
	updateValidity: (valid: boolean) => unknown;
	showErrors: boolean;
	disableInteraction: boolean;
	disambigKey: number | string;
}

interface FieldAddEntryProps<T, U> {
	fieldSettings: T;
	defaultFieldData: U;
	updateFieldData: (fieldData: U) => unknown;
	updateValidity: (valid: boolean) => unknown;
	showErrors: boolean;
	disableInteraction: boolean;
	disambigKey: number | string;
	fieldLabel: string;
}

interface FieldDisplayEntryProps {
	schema: string;
	info: string;
}

export interface Field<T, U> {
	id: string;
	friendlyName: () => string;
	getDefaultFieldSettings: () => T;
	getDefaultEntry: (fieldSettings: T) => U;
	NewThingComponent: (props: FieldNewThingProps<T>) => React.ReactNode;
	AddMenuIcon: (props: unknown) => React.ReactNode;
	AddEntryComponent: (props: FieldAddEntryProps<T, U>) => React.ReactNode;
	DisplayEntryComponent: (props: FieldDisplayEntryProps) => React.ReactNode;
}

export const FIELDS = {
	[dateField.id]: dateField,
	[textField.id]: textField,
	[rangeField.id]: rangeField,
	[optionsField.id]: optionsField,
} as { [key: string]: Field<unknown, unknown> };
