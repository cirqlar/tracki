import { LazyExoticComponent } from "react";
import dateField from "./dates";

interface FieldNewThingProps<T> {
	variant: string;
	fieldSettings: T;
	updateFieldData: (fieldData: T) => unknown;
}
type NewThingComponent<T> = (props: FieldNewThingProps<T>) => React.ReactNode;

interface FieldAddMenuProps {
	variant: string;
}
type AddMenuIcon = (props: FieldAddMenuProps) => React.ReactNode;

interface FieldAddEntryProps {
	schema: string;
}
type AddEntryComponent = (props: FieldAddEntryProps) => React.ReactNode;

interface FieldDisplayEntryProps {
	schema: string;
	info: string;
}
type DisplayEntryComponent = (props: FieldDisplayEntryProps) => React.ReactNode;

export interface Field<T> {
	id: string;
	friendlyName: (variant: string) => string;
	variants: string | string[];
	fieldSettingsToSchemaString: (fieldSettings: T) => string;
	NewThingComponent:
		| NewThingComponent<T>
		| LazyExoticComponent<NewThingComponent<T>>;
	AddMenuIcon: AddMenuIcon | LazyExoticComponent<AddMenuIcon>;
	AddEntryComponent:
		| AddEntryComponent
		| LazyExoticComponent<AddEntryComponent>;
	DisplayEntryComponent:
		| DisplayEntryComponent
		| LazyExoticComponent<DisplayEntryComponent>;
}

export const FIELDS: Field<unknown>[] = [dateField];
