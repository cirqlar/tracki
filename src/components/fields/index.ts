import { JSX } from "react";
import dateField from "./dates";

interface FieldNewThingProps<T> {
	variant: string;
	fieldSettings: T;
	updateFieldData: (fieldData: T) => unknown;
}

interface FieldAddMenuProps {
	variant: string;
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
	friendlyName: (variant: string) => string;
	variants: string | string[];
	fieldSettingsToSchemaString: (fieldSettings: T) => string;
	NewThingComponent: (props: FieldNewThingProps<T>) => JSX.Element;
	AddMenuIcon: (props: FieldAddMenuProps) => JSX.Element;
	AddEntryComponent: (props: FieldAddEntryProps) => JSX.Element;
	DisplayEntryComponent: (props: FieldDisplayEntryProps) => JSX.Element;
}

export const FIELDS: Field<unknown>[] = [dateField];
