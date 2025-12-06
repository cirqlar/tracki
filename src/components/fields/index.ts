import dateField from "./dates";
import tagsField from "./tags";
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

interface FieldDisplayEntryProps<T, U> {
	settings: T;
	data: U;
}

export type TransformedDataKey = `d_${string}`;

export interface TransformedData {
	[key: TransformedDataKey]: number;
	fields: string[];
}

export type Field<T = unknown, U = unknown> = {
	// Field info
	id: string;
	friendlyName: () => string;

	// Defaults
	getDefaultFieldSettings: () => T;
	getDefaultEntry: (fieldSettings: T) => U;

	// Components
	NewThingComponent: (props: FieldNewThingProps<T>) => React.ReactNode;
	AddMenuIcon: (props: unknown) => React.ReactNode;
	AddEntryComponent: (props: FieldAddEntryProps<T, U>) => React.ReactNode;
	DisplayEntryComponent: (
		props: FieldDisplayEntryProps<T, U>,
	) => React.ReactNode;
} & (
	| {
			canProvideData: true;
			defaultAggregation: "average" | "addition";
			useDataName: boolean;

			// helpers/providers
			transformData: (data: U, settings: T) => TransformedData;
			getMaxValue: (settings: T) => number | undefined;
	  }
	| { canProvideData?: false }
);

export type FieldWithData<T = unknown, U = unknown> = Field<T, U> & {
	canProvideData: true;
};

export const FIELDS = {
	[dateField.id]: dateField,
	[textField.id]: textField,
	[rangeField.id]: rangeField,
	[tagsField.id]: tagsField,
} as { [key: string]: Field };
