import {
	Area,
	AreaChart,
	Legend,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import { format } from "date-fns";

import { GRAPH_COLOURS, useSimpleData } from "./util";

interface SingleAreaProps {
	thingId: number;
	fieldKey: string;
	fields?: string[] | "all";
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

export default function SimpleArea(props: SingleAreaProps) {
	const transformedData = useSimpleData(
		props.thingId,
		props.fieldKey,
		props.fields,
	);

	if (!transformedData) {
		return (
			<div>
				<p>Loading</p>
			</div>
		);
	}

	return (
		<ResponsiveContainer width="100%">
			<AreaChart data={transformedData.data}>
				<defs>
					{transformedData.fields.map((_, i) => (
						<Gradient
							key={i}
							color={GRAPH_COLOURS[i]}
							id={`${props.disambigKey}_${i}`}
						/>
					))}
				</defs>

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
					<Area
						type="monotone"
						key={k}
						dataKey={k}
						stackId={props.stack ? 1 : undefined}
						stroke={GRAPH_COLOURS[i]}
						fill={`url(#${props.disambigKey}_${i})`}
					/>
				))}
				{transformedData.fields.length > 1 && <Legend />}
			</AreaChart>
		</ResponsiveContainer>
	);
}
