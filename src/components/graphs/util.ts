import { useMemo } from "react";
import { add, interval, isWithinInterval, set, sub } from "date-fns";
import { useQuery } from "@tanstack/react-query";

import { Entry, Thing } from "@/components/db";
import { getThing } from "@/components/db/thing";
import { getEntriesByDate } from "@/components/db/entry";
import { FIELDS, FieldWithData, TransformedDataKey } from "@/components/fields";

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
export interface DataOptions {
	periodCount?: number;
	periodKind?: "hours" | "days" | "weeks" | "months";
	grouping?: "none" | "hours" | "days" | "weeks";
	start?: Date;
}

export interface FieldOptions {
	key: string;
	fields?: string[] | "all";
}

export interface TransformedField {
	key: TransformedDataKey;
	name: string;
}

function transformData(thing: Thing, entries: Entry[], fields: FieldOptions[]) {
	const fieldInfos = [];
	const outFields: TransformedField[] = [];
	const outAggregation: ("average" | "addition")[] = [];

	for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
		const currentFieldKey = fields[fieldIndex].key;
		const currentField = thing.fields.find((v) => v.key == currentFieldKey);
		if (!currentField || !FIELDS[currentField.field_id].canProvideData) {
			continue;
		}

		const currentFieldSpec = FIELDS[currentField.field_id] as FieldWithData;

		const first_data = currentFieldSpec.transformData(
			entries[0].fields[currentFieldKey],
			currentField.settings,
		);
		let fields_to_check: string[];
		if (fields[fieldIndex].fields) {
			if (fields[fieldIndex].fields === "all") {
				fields_to_check = first_data.fields;
			} else {
				fields_to_check = fields[fieldIndex].fields as string[];
			}
		} else {
			fields_to_check = [first_data.fields[0]];
		}

		const dataToFinalMap: {
			dataKey: TransformedDataKey;
			finalKey: TransformedDataKey;
		}[] = [];

		for (let f = 0; f < fields_to_check.length; f++) {
			const originalFieldName = fields_to_check[f];
			const finalKey: TransformedDataKey = `d_${currentFieldKey}_${originalFieldName}`;

			dataToFinalMap.push({
				dataKey: `d_${originalFieldName}`,
				finalKey,
			});
			outFields.push({
				name: currentFieldSpec.useDataName
					? `${originalFieldName} (${currentField.name})`
					: currentField.name,
				key: finalKey,
			});
			outAggregation.push(currentFieldSpec.defaultAggregation);
		}

		fieldInfos.push({
			key: currentFieldKey,
			field_id: currentField.field_id,
			settings: currentField.settings,
			dataToFinalMap,
		});
	}

	if (fieldInfos.length <= 0) {
		return undefined;
	}

	const data: SingleData[] = [];

	for (let entryIndex = 0; entryIndex < entries.length; entryIndex++) {
		const entryData: SingleData = {
			date: entries[entryIndex].created_for.getTime(),
		};

		for (let infoIndex = 0; infoIndex < fieldInfos.length; infoIndex++) {
			const tData = (
				FIELDS[fieldInfos[infoIndex].field_id] as FieldWithData
			).transformData(
				entries[entryIndex].fields[fieldInfos[infoIndex].key],
				fieldInfos[infoIndex].settings,
			);

			const dataToFinalMap = fieldInfos[infoIndex].dataToFinalMap;

			for (
				let mapIndex = 0;
				mapIndex < dataToFinalMap.length;
				mapIndex++
			) {
				const dataKey = dataToFinalMap[mapIndex].dataKey;
				const finalKey = dataToFinalMap[mapIndex].finalKey;
				entryData[finalKey] = tData[dataKey];
			}
		}

		data.push(entryData);
	}

	return {
		data,
		fields: outFields,
		aggregationTypes: outAggregation,
	};
}

function groupData(
	data: SingleData[],
	fields: TransformedField[],
	oGrouping: Exclude<DataOptions["grouping"], undefined | "none">,
	aggregationTypes: ("average" | "addition")[],
	start: Date,
	end?: Date,
) {
	let currentDate = start;
	const endDate = end ?? new Date();

	const groupedData: SingleData[] = [];
	let currentDataIndex = 0;

	while (currentDate < endDate) {
		const currentGroupedData: SingleData = {
			date: currentDate.getTime(),
		};
		const nextDate = add(currentDate, { [oGrouping]: 1 });

		const currentInterval = interval(currentDate, nextDate);
		let entryCount = 0;

		while (currentDataIndex < data.length) {
			const entryDate = new Date(data[currentDataIndex].date);

			if (isWithinInterval(entryDate, currentInterval)) {
				for (
					let fieldIndex = 0;
					fieldIndex < fields.length;
					fieldIndex++
				) {
					const currentFieldKey = fields[fieldIndex].key;
					currentGroupedData[currentFieldKey] =
						(currentGroupedData[currentFieldKey] ?? 0) +
						data[currentDataIndex][currentFieldKey];
				}

				currentDataIndex += 1;
				entryCount += 1;
			} else {
				break;
			}
		}

		for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
			if (aggregationTypes[fieldIndex] === "average") {
				const currentFieldKey = fields[fieldIndex].key;
				if (currentGroupedData[currentFieldKey]) {
					currentGroupedData[currentFieldKey] =
						currentGroupedData[currentFieldKey] / entryCount;
				}
			}
		}

		groupedData.push(currentGroupedData);
		currentDate = nextDate;
	}

	return groupedData;
}

export function useData(
	thingId: number,
	graphs: FieldOptions[],
	options: DataOptions = {},
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

		const data = transformData(thing, entries, graphs);

		if (!data) {
			return undefined;
		}

		if (options.grouping && options.grouping !== "none") {
			data.data = groupData(
				data.data,
				data.fields,
				options.grouping,
				data.aggregationTypes,
				startDate,
				endDate,
			);
		}

		return data;
	}, [thing, entries, graphs, options.grouping, startDate, endDate]);

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
