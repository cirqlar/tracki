import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getThing } from "@/components/db/thing";
import { getEntries } from "@/components/db/entry";
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

export function useSimpleData(
	thingId: number,
	fieldKey: string,
	fields?: string[] | "all",
) {
	const { data: thing } = useQuery({
		queryKey: ["thing", thingId],
		queryFn: () => getThing(thingId),
	});
	// TODO: paginated entry queries
	const { data: entries } = useQuery({
		queryKey: ["entries", thingId],
		queryFn: () => getEntries(thingId),
	});

	const transformedData = useMemo(() => {
		if (!thing || !entries || entries.length <= 0) {
			return undefined;
		}

		const field = thing.fields.find((v) => v.key == fieldKey);
		if (!field) {
			return undefined;
		}

		const field_data = FIELDS[field.field_id];
		if (!field_data.canProvideData) {
			return undefined;
		}

		let data: SingleData[] = [];
		let data_fields: TransformedDataKey[] = [];

		const first_data = field_data.transformData(
			entries[0].fields[fieldKey],
			field.settings,
		);
		let fields_to_check: string[];
		if (fields) {
			if (fields === "all") {
				fields_to_check = first_data.fields;
			} else {
				fields_to_check = fields;
			}
		} else {
			fields_to_check = [first_data.fields[0]];
		}

		for (let e = 0; e < entries.length; e++) {
			let obj: SingleData = {
				date: entries[e].created_for.getTime(),
			};

			const tData = field_data.transformData(
				entries[e].fields[fieldKey],
				field.settings,
			);

			for (let f = 0; f < fields_to_check.length; f++) {
				const dataKey: TransformedDataKey = `d_${fields_to_check[f]}`;
				obj[dataKey] = tData[dataKey];

				if (e === 0) {
					data_fields.push(dataKey);
				}
			}

			data.push(obj);
		}

		return { data, fields: data_fields };
	}, [thing, entries, fieldKey, fields]);

	return transformedData;
}
