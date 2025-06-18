import {
	CartesianGrid,
	Legend,
	Line,
	LineChart as RechartsLineChart,
	ResponsiveContainer,
} from "recharts";

import { DataOptions, FieldOptions, GRAPH_COLOURS, useData } from "./util";
import { defaultAxes } from "./shared";

interface LineChartProps {
	thingId: number;
	fields: FieldOptions[];
	options?: DataOptions;
}

export default function LineChart(props: LineChartProps) {
	const {
		data: transformedData,
		maxValue,
		startDate,
		endDate,
	} = useData(props.thingId, props.fields, props.options);

	if (!transformedData) {
		return (
			<div>
				<p>Loading</p>
			</div>
		);
	}

	return (
		<ResponsiveContainer width="100%" aspect={1}>
			<RechartsLineChart data={transformedData.data}>
				{defaultAxes({
					startDate,
					endDate,
					padLeft: true,
					maxValue,
					grouping: props.options?.grouping,
				})}

				<CartesianGrid vertical={false} />
				{transformedData.fields.map((k, i) => (
					<Line
						type="monotone"
						key={k.key}
						dataKey={k.key}
						name={k.name}
						connectNulls
						stroke={GRAPH_COLOURS[i % GRAPH_COLOURS.length]}
					/>
				))}
				{transformedData.fields.length > 1 && <Legend />}
			</RechartsLineChart>
		</ResponsiveContainer>
	);
}
