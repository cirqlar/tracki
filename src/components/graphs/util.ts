import { useMemo } from "react";
import { add, interval, isWithinInterval, set, sub } from "date-fns";
import { useQuery } from "@tanstack/react-query";

import { Entry, Thing } from "@/components/db";
import { getThing } from "@/components/db/thing";
import { getEntriesByDate } from "@/components/db/entry";
import { FIELDS, TransformedDataKey } from "@/components/fields";

// TODO: Pick better colours
export const GRAPH_COLOURS = [
	"red",
	"orange",
	"yellow",
	"green",
	"blue",
	"indigo",
	"violet",
];

interface SingleData {
	date: number;
	[key: TransformedDataKey]: number;
}

export interface SimpleDataOptions {
	fields?: string[] | "all";
	periodCount?: number;
	periodKind?: "hours" | "days" | "weeks" | "months";
	grouping?: "none" | "hours" | "days" | "weeks";
	start?: Date;
}

function transformData(
	thing: Thing,
	entries: Entry[],
	fieldKey: string,
	oFields: SimpleDataOptions["fields"],
) {
	const field = thing.fields.find((v) => v.key == fieldKey);
	if (!field) {
		return undefined;
	}

	const field_data = FIELDS[field.field_id];
	if (!field_data.canProvideData) {
		return undefined;
	}

	const data: SingleData[] = [];
	const data_fields: TransformedDataKey[] = [];

	const first_data = field_data.transformData(
		entries[0].fields[fieldKey],
		field.settings,
	);
	let fields_to_check: string[];
	if (oFields) {
		if (oFields === "all") {
			fields_to_check = first_data.fields;
		} else {
			fields_to_check = oFields;
		}
	} else {
		fields_to_check = [first_data.fields[0]];
	}

	for (let f = 0; f < fields_to_check.length; f++) {
		data_fields.push(`d_${fields_to_check[f]}`);
	}

	for (let e = 0; e < entries.length; e++) {
		const obj: SingleData = {
			date: entries[e].created_for.getTime(),
		};

		const tData = field_data.transformData(
			entries[e].fields[fieldKey],
			field.settings,
		);

		for (let f = 0; f < fields_to_check.length; f++) {
			const dataKey = data_fields[f];
			obj[dataKey] = tData[dataKey];
		}

		data.push(obj);
	}

	return {
		data,
		fields: data_fields,
		aggregationType: field_data.defaultAggregation,
	};
}

function groupData(
	data: SingleData[],
	fields: TransformedDataKey[],
	oGrouping: Exclude<SimpleDataOptions["grouping"], undefined | "none">,
	aggregationType: "average" | "addition",
	start: Date,
	end?: Date,
) {
	let current = start;
	const finish = end ?? new Date();

	const newData: SingleData[] = [];
	let currentIndex = 0;

	while (current < finish) {
		const obj: SingleData = {
			date: current.getTime(),
		};
		const next = add(current, { [oGrouping]: 1 });

		const int = interval(current, next);
		let count = 0;

		while (currentIndex < data.length) {
			const date = new Date(data[currentIndex].date);
			if (isWithinInterval(date, int)) {
				for (let f = 0; f < fields.length; f++) {
					const field = fields[f];
					obj[field] = (obj[field] ?? 0) + data[currentIndex][field];
				}

				currentIndex += 1;
				count += 1;
			} else {
				break;
			}
		}

		if (aggregationType === "average") {
			for (let f = 0; f < fields.length; f++) {
				const field = fields[f];
				if (obj[field]) {
					obj[field] = obj[field] / count;
				}
			}
		}

		newData.push(obj);
		current = next;
	}

	return newData;
}

export function useSimpleData(
	thingId: number,
	fieldKey: string,
	options: SimpleDataOptions = {},
) {
	const [startDate, endDate] = useMemo(() => {
		if (!options.periodKind) {
			const s =
				options.start ??
				set(sub(new Date(), { weeks: 1 }), {
					hours: 0,
					minutes: 0,
					seconds: 0,
					milliseconds: 0,
				});
			return [s, undefined];
		} else if (options.start) {
			const e = add(options.start, {
				[options.periodKind]: options.periodCount ?? 1,
			});
			return [options.start, e];
		} else {
			const s = set(
				sub(new Date(), { [options.periodKind]: options.periodCount }),
				{
					hours: options.periodKind == "hours" ? undefined : 0,
					minutes: 0,
					seconds: 0,
					milliseconds: 0,
				},
			);
			return [s, undefined];
		}
	}, [options.periodCount, options.periodKind, options.start]);

	const {
		data: thing,
		isPending: thingIsPending,
		isFetching: thingIsFetching,
		isSuccess: thingIsSuccess,
		isError: thingIsError,
		error: thingError,
	} = useQuery({
		queryKey: ["thing", thingId],
		queryFn: () => getThing(thingId),
	});

	const {
		data: entries,
		isPending: entriesIsPending,
		isFetching: entriesIsFetching,
		isSuccess: entriesIsSuccess,
		isError: entriesIsError,
		error: entriesError,
	} = useQuery({
		queryKey: ["entries", thingId, startDate, endDate],
		queryFn: () =>
			getEntriesByDate(thingId, {
				after: startDate,
				before: endDate,
			}),
	});

	const transformedData = useMemo(() => {
		if (!thing || !entries || entries.length <= 0) {
			return undefined;
		}

		const data = transformData(thing, entries, fieldKey, options.fields);

		if (!data) {
			return undefined;
		}

		if (options.grouping && options.grouping !== "none") {
			data.data = groupData(
				data.data,
				data.fields,
				options.grouping,
				data.aggregationType,
				startDate,
				endDate,
			);
		}

		return data;
	}, [
		thing,
		entries,
		fieldKey,
		options.fields,
		options.grouping,
		startDate,
		endDate,
	]);

	return {
		data: transformedData,
		startDate,
		endDate,
		isPending: thingIsPending || entriesIsPending,
		isFetching: thingIsFetching || entriesIsFetching,
		isSuccess: thingIsSuccess || entriesIsSuccess,
		isError: thingIsError || entriesIsError,
		error: thingError || entriesError,
	};
}
