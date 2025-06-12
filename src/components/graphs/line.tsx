import { format } from "date-fns";
import {
	Legend,
	Line,
	LineChart as RechartsLineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";

import { DataOptions, FieldOptions, GRAPH_COLOURS, useData } from "./util";

interface LineChartProps {
	thingId: number;
	fields: FieldOptions[];
	options?: DataOptions;
}

export default function LineChart(props: LineChartProps) {
	const {
		data: transformedData,
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
		<ResponsiveContainer width="100%">
			<RechartsLineChart data={transformedData.data}>
				<XAxis
					dataKey="date"
					type="number"
					domain={[
						startDate.getTime(),
						endDate ? endDate.getTime() : "dataMax",
					]}
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
