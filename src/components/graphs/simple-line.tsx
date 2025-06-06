import { useMemo } from "react";
import {
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import { useQuery } from "@tanstack/react-query";

import { getThing } from "@/components/db/thing";
import { getEntries } from "@/components/db/entry";
import { FIELDS, TransformedDataKey } from "@/components/fields";
import { format } from "date-fns";

interface SingleLineProps {
	thingId: number;
	fieldKey: string;
	fields?: number[] | "all";
}

interface SingleLineData {
	date: number;
	[key: TransformedDataKey]: number;
}

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

export default function SimpleLine(props: SingleLineProps) {
	const { data: thing } = useQuery({
		queryKey: ["thing", props.thingId],
		queryFn: () => getThing(props.thingId),
	});
	// TODO: paginated entry queries
	const { data: entries } = useQuery({
		queryKey: ["entries", props.thingId],
		queryFn: () => getEntries(props.thingId),
	});

	const transformedData = useMemo(() => {
		if (!thing || !entries || entries.length <= 0) {
			return undefined;
		}

		const field = thing.fields.find((v) => v.key == props.fieldKey);
		if (!field) {
			return undefined;
		}

		const field_data = FIELDS[field.field_id];
		if (!field_data.canProvideData) {
			return undefined;
		}

		let data: SingleLineData[] = [];
		let data_fields: TransformedDataKey[] = [];
		let fields;
		if (props.fields) {
			if (props.fields === "all") {
				const tData = field_data.transformData(
					entries[0].fields[props.fieldKey],
					field.settings,
				);
				fields = tData.fields.map((_, i) => i);
			} else {
				fields = props.fields;
			}
		} else {
			fields = [0];
		}

		for (let e = 0; e < entries.length; e++) {
			let obj: SingleLineData = {
				date: entries[e].created_for.getTime(),
			};

			const tData = field_data.transformData(
				entries[e].fields[props.fieldKey],
				field.settings,
			);

			for (let f = 0; f < fields.length; f++) {
				let ind = fields[f];
				const dataKey: TransformedDataKey = `d_${tData.fields[ind]}`;
				obj[dataKey] = tData[dataKey];

				if (e === 0) {
					data_fields.push(dataKey);
				}
			}

			data.push(obj);
		}

		return { data, fields: data_fields };
	}, [thing, entries, props.fieldKey, props.fields]);

	if (!transformedData) {
		return (
			<div>
				<p>Loading</p>
			</div>
		);
	}

	return (
		<ResponsiveContainer width="100%">
			<LineChart data={transformedData.data}>
				<XAxis
					dataKey="date"
					type="number"
					domain={["dataMin", "dataMax"]}
					interval="preserveStartEnd"
					tickFormatter={(d) => format(new Date(d), "dd/MM/yy-HH:mm")}
					stroke="white"
				/>
				<YAxis
					domain={["dataMin", "dataMax"]}
					stroke="white"
					width={20}
				/>
				{transformedData.fields.map((k, i) => (
					<Line
						type="monotone"
						key={k}
						dataKey={k}
						stroke={colors[i]}
					/>
				))}
				{transformedData.fields.length > 1 && <Legend />}
			</LineChart>
		</ResponsiveContainer>
	);
}
