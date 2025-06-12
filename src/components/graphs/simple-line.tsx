import { format } from "date-fns";
import {
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";

import { GRAPH_COLOURS, SimpleDataOptions, useSimpleData } from "./util";

interface SingleLineProps {
	thingId: number;
	fieldKey: string;
	options?: SimpleDataOptions;
}

export default function SimpleLine(props: SingleLineProps) {
	const {
		data: transformedData,
		startDate,
		endDate,
	} = useSimpleData(props.thingId, props.fieldKey, props.options);

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
						key={k}
						dataKey={k}
						stroke={GRAPH_COLOURS[i]}
					/>
				))}
				{transformedData.fields.length > 1 && <Legend />}
			</LineChart>
		</ResponsiveContainer>
	);
}
