import { Field } from "@/components/fields";

export type DateType = "anytime" | "specific";

export interface DateSettings {
	type: DateType;
}

export type DateField = Field<DateSettings>;
