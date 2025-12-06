import {
	eachDayOfInterval,
	eachHourOfInterval,
	eachWeekOfInterval,
	format,
	interval,
	intervalToDuration,
	sub,
} from "date-fns";
import { XAxis, YAxis } from "recharts";

interface XAxisProps {
	padLeft?: boolean;
	padHalfDay?: boolean;
	startDate: Date;
	endDate: Date;
	ticks?: (string | number)[];
	grouping?: "none" | "hours" | "days" | "weeks";
	forceInterval?: boolean;
	key?: string;
}

export function defaultXAxis(props: XAxisProps) {
	let grouping =
		props.grouping && props.grouping !== "none"
			? props.grouping
			: undefined;
	let ticks = props.ticks;

	if (!ticks) {
		const int = interval(props.startDate, props.endDate);
		if (!grouping) {
			if (intervalToDuration(int).days ?? 0 > 1) {
				grouping = "days";
			} else {
				grouping = "hours";
			}
		}

		if (grouping === "hours") {
			ticks = eachHourOfInterval(int).map((d) => d.getTime());
		} else if (grouping === "days") {
			ticks = eachDayOfInterval(int).map((d) => d.getTime());
		} else if (grouping === "weeks") {
			ticks = eachWeekOfInterval(int).map((d) => d.getTime());
		}
	}

	return (
		<XAxis
			key={props.key}
			dataKey="date"
			type="number"
			angle={30}
			tickMargin={10}
			padding={props.padLeft ? { left: 30 } : undefined}
			domain={[
				(props.padHalfDay
					? sub(props.startDate, { hours: 12 })
					: props.startDate
				).getTime(),
				props.endDate.getTime(),
			]}
			tickFormatter={(d) =>
				grouping === "hours"
					? format(new Date(d), "HH:mm")
					: format(new Date(d), "dd/MM")
			}
			interval={props.forceInterval ? 0 : "preserveStartEnd"}
			ticks={ticks}
			stroke="white"
		/>
	);
}

interface YAxisProps {
	maxValue?: number;
	key?: string;
}

export function defaultYAxis(props: YAxisProps) {
	const maxValue = props.maxValue ? Math.ceil(props.maxValue) : undefined;
	let ticks = undefined;
	if (maxValue && maxValue > 1) {
		ticks = Array(maxValue + 1)
			.fill(0)
			.map((_, i) => i);
	} else if (maxValue) {
		ticks = [0, 0.2, 0.4, 0.6, 0.8, 1];
	}

	return (
		<YAxis
			key={props.key}
			domain={[0, maxValue ?? "auto"]}
			allowDecimals={false}
			stroke="white"
			tickFormatter={(n) => (Math.floor(n * 100) / 100).toLocaleString()}
			mirror
			tickLine={false}
			tickMargin={0}
			axisLine={false}
			ticks={ticks}
			tick={(tickProps) => (
				<text
					className={tickProps.className}
					fill={tickProps.fill}
					width={tickProps.width}
					height={tickProps.height}
					orientation={tickProps.orientation}
					stroke={tickProps.stroke}
					textAnchor={tickProps.textAnchor}
					x={tickProps.x}
					y={tickProps.y}
					transform={
						tickProps.index === tickProps.visibleTicksCount - 1
							? "translate(0 10)"
							: "translate(0 -8)"
					}
				>
					<tspan x={tickProps.x}>
						{tickProps.tickFormatter(tickProps.payload.value)}
					</tspan>
				</text>
			)}
		/>
	);
}

type DefaultAxesProps = XAxisProps & YAxisProps;

export function defaultAxes(props: DefaultAxesProps) {
	return [
		defaultXAxis({ ...props, key: "1" }),
		defaultYAxis({ ...props, key: "2" }),
	];
}
