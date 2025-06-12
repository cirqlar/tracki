import {
	Area,
	AreaChart as RechartsAreaChart,
	Legend,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import { format } from "date-fns";

import { DataOptions, FieldOptions, GRAPH_COLOURS, useData } from "./util";

interface SingleAreaProps {
	thingId: number;
	fields: FieldOptions[];
	options?: DataOptions;
	disambigKey: string;
	stack?: boolean;
}

function Gradient({ color, id }: { color: string; id: string }) {
	return (
		<linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
			<stop offset="5%" stopColor={color} stopOpacity={0.8} />
			<stop offset="95%" stopColor={color} stopOpacity={0} />
		</linearGradient>
	);
}

export default function AreaChart(props: SingleAreaProps) {
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
			<RechartsAreaChart data={transformedData.data}>
				<defs>
					{transformedData.fields.map((field, i) => (
						<Gradient
							key={field.key}
							color={GRAPH_COLOURS[i % GRAPH_COLOURS.length]}
							id={`${props.disambigKey}_${i}`}
						/>
					))}
				</defs>

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
				{transformedData.fields.map((field, i) => (
					<Area
						type="monotone"
						key={field.key}
						dataKey={field.key}
						name={field.name}
						stackId={props.stack ? 1 : undefined}
						stroke={GRAPH_COLOURS[i % GRAPH_COLOURS.length]}
						fill={`url(#${props.disambigKey}_${i})`}
					/>
				))}
				{transformedData.fields.length > 1 && <Legend />}
			</RechartsAreaChart>
		</ResponsiveContainer>
	);
}
