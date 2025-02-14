import type { Field } from "@/components/fields";

export const DAYS_OF_THE_WEEK = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
] as const;
export type DayOfTheWeek = (typeof DAYS_OF_THE_WEEK)[number];

export const RELATIVE_DAYS = [
	"First",
	"Second",
	"Third",
	"Fourth",
	"Last",
] as const;
export type RelativeDay = (typeof RELATIVE_DAYS)[number];

export type WeekSettings = {
	type: "week";
	days: DayOfTheWeek[];
};
export type MonthSettings = { type: "month" } & (
	| { variant: "whenever" }
	| { variant: "day"; day: number }
	| {
			variant: "relative";
			when: RelativeDay;
			day_of_week: DayOfTheWeek;
	  }
);

export type DateSettings =
	| { type: "anytime" }
	| ({ count: number } & (
			| { type: "day" }
			| WeekSettings
			| MonthSettings
			| { type: "year" }
	  ));

export type TimeSettings =
	| { type: "anytime" }
	| { type: "hours"; count: number; from: string }
	| { type: "times"; times: string[] };

export type DateFieldSettings = {
	date: DateSettings;
	time: TimeSettings;
};

export type DateFieldData = {
	datetime: number;
};

export type DateType = DateSettings["type"];
export type TimeType = TimeSettings["type"];

export type DateField = Field<DateFieldSettings, DateFieldData>;
