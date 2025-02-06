import type { Field } from "@/components/fields";

export type DateVariant = "date-time" | "date-only" | "time-only";
export type DateType = "anytime" | "specific";

export interface DateSettings {
	type: DateType;
}

export type DateField = Field<DateSettings>;
