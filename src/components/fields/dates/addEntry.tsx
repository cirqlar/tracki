import {
	useState,
	experimental_useEffectEvent as useEffectEvent,
	useEffect,
} from "react";
import type { DateField } from "./types";
import { format } from "date-fns";

const AddEntryComponent: DateField["AddEntryComponent"] = ({
	defaultFieldData: dfs,
	fieldSettings,
	fieldLabel,
	...props
}) => {
	const [date, setDate] = useState(format(dfs.date, "yyyy-MM-dd"));
	const [time, setTime] = useState(format(dfs.date, "HH:mm"));

	const updateFieldData = useEffectEvent(props.updateFieldData);
	// const readFieldSettings = useEffectEvent(() => fieldSettings);

	useEffect(() => {
		const offset = new Date().getTimezoneOffset();
		const sign = offset < 0 ? "+" : "-";
		const hours = Math.floor(Math.abs(offset) / 60);
		const minutes = Math.abs(offset) - hours * 60;

		const nDate = new Date(
			`${date}T${time}:00.000${sign}${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`,
		);

		updateFieldData({ date: nDate });
	}, [date, time]);

	return (
		<div className="flex gap-2">
			{fieldSettings.date.type === "anytime" && (
				<input
					id={fieldLabel}
					type="date"
					className="grow rounded-sm border-2 border-gray-800 bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-gray-800"
					defaultValue={date}
					onChange={(e) => setDate(e.target.value)}
				/>
			)}
			{fieldSettings.time.type === "anytime" && (
				<input
					type="time"
					className="grow rounded-sm border-2 border-gray-800 bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-gray-800"
					defaultValue={time}
					onChange={(e) => setTime(e.target.value)}
				/>
			)}
		</div>
	);
};

export default AddEntryComponent;
