import {
	Bar,
	BarChart as RechartsBarChart,
	Legend,
	ResponsiveContainer,
	CartesianGrid,
	ReferenceArea,
} from "recharts";
import { add, sub } from "date-fns";

import { DataOptions, FieldOptions, GRAPH_COLOURS, useData } from "./util";
import { useMemo } from "react";
import { defaultAxes } from "./shared";

interface SingleAreaProps {
	thingId: number;
	fields: FieldOptions[];
	options?: DataOptions;
	stack?: boolean;
}

export default function BarChart(props: SingleAreaProps) {
	const options = useMemo(
		() => ({
			...props.options,
			grouping:
				!props.options?.grouping || props.options.grouping === "none"
					? "days"
					: props.options.grouping,
		}),
		[props.options],
	);
	const {
		data: transformedData,
		maxValue,
		startDate,
		endDate,
	} = useData(props.thingId, props.fields, options);

	const genBg = useMemo(() => {
		if (!transformedData?.data) return undefined;

		const count = Math.ceil(transformedData.data.length / 2);
		const ellArr = [];

		for (let i = 0; i < count; i++) {
			const d = transformedData.data[i * 2].date;
			const start = sub(d, { hours: 12 }).getTime();
			const end = add(d, { hours: 12 }).getTime();

			ellArr.push(<ReferenceArea x1={start} x2={end} key={start} />);
		}
		return ellArr;
	}, [transformedData?.data]);

	if (!transformedData) {
		return (
			<div>
				<p>Loading</p>
			</div>
		);
	}

	return (
		<ResponsiveContainer width="100%" aspect={1}>
			<RechartsBarChart data={transformedData.data}>
				{defaultAxes({
					startDate,
					endDate,
					padLeft: true,
					padHalfDay: true,
					ticks: transformedData.data.map((t) => t.date),
					maxValue,
					grouping: options.grouping,
					forceInterval: true,
				})}
				<CartesianGrid vertical={false} />

				{genBg}

				{transformedData.fields.map((field, i) => (
					<Bar
						key={field.key}
						dataKey={field.key}
						name={field.name}
						stackId={props.stack ? 1 : undefined}
						fill={GRAPH_COLOURS[i % GRAPH_COLOURS.length]}
					/>
				))}
				{transformedData.fields.length > 1 && <Legend />}
			</RechartsBarChart>
		</ResponsiveContainer>
	);
}
