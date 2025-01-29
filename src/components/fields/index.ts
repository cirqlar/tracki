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
	NewThingComponent: (props: FieldNewThingProps<T>) => React.ReactNode;
	AddMenuIcon: (props: FieldAddMenuProps) => React.ReactNode;
	AddEntryComponent: (props: FieldAddEntryProps) => React.ReactNode;
	DisplayEntryComponent: (props: FieldDisplayEntryProps) => React.ReactNode;
}

export const FIELDS: Field<unknown>[] = [dateField];
