import type { DateField } from "./types";
import { format } from "date-fns";

const AddEntryComponent: DateField["AddEntryComponent"] = ({
	fieldSettings,
	fieldLabel,
}) => {
	return (
		<div className="flex gap-2">
			{fieldSettings.date.type === "anytime" && (
				<input
					id={fieldLabel}
					type="date"
					className="grow rounded-sm border-2 border-gray-800 bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-gray-800"
					defaultValue={format(Date.now(), "yyyy-MM-dd")}
				/>
			)}
			{fieldSettings.time.type === "anytime" && (
				<input
					type="time"
					className="grow rounded-sm border-2 border-gray-800 bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-gray-800"
					defaultValue={format(Date.now(), "HH:mm")}
				/>
			)}
		</div>
	);
};

export default AddEntryComponent;
