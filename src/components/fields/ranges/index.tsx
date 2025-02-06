import type { Field } from "@/components/fields";
import {
	useEffect,
	useState,
	experimental_useEffectEvent as useEffectEvent,
} from "react";
import { MdLinearScale } from "react-icons/md";

export interface RangeSettings {
	start: number;
	end: number;
	step: number;
}

type RangeField = Field<RangeSettings>;

const NewThingComponent: RangeField["NewThingComponent"] = ({
	updateFieldData,
}) => {
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(0);
	const [step, setStep] = useState(0);

	const updateData = useEffectEvent((fieldSettings: RangeSettings) => {
		updateFieldData(fieldSettings);
	});

	useEffect(() => {
		updateData({
			start,
			end,
			step,
		});
	}, [start, end, step]);

	return (
		<div className="rounded-sm bg-gray-800 p-4">
			<p className="mb-4">Range Settings</p>

			<fieldset className="grid w-full grid-cols-[auto_1fr] gap-2">
				<label className="col-span-2 grid grid-cols-subgrid items-center">
					Start
					<input
						type="number"
						defaultValue={start}
						onChange={(e) => setStart(e.target.valueAsNumber)}
						className="border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
					/>
				</label>
				<label className="col-span-2 grid grid-cols-subgrid items-center">
					End
					<input
						type="number"
						defaultValue={end}
						onChange={(e) => setEnd(e.target.valueAsNumber)}
						className="border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
					/>
				</label>
				<label className="col-span-2 grid grid-cols-subgrid items-center">
					Step
					<input
						type="number"
						defaultValue={step}
						onChange={(e) => setStep(e.target.valueAsNumber)}
						className="border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
					/>
				</label>
			</fieldset>
		</div>
	);
};

const AddMenuIcon: RangeField["AddMenuIcon"] = () => {
	return <MdLinearScale className="h-full w-full" />;
};

const rangeField: RangeField = {
	id: "fields/range/0001",
	friendlyName: () => "Range",
	fieldSettingsToSchemaString: (rangeSettings) =>
		JSON.stringify(rangeSettings),
	NewThingComponent,
	AddMenuIcon,
	AddEntryComponent: () => null,
	DisplayEntryComponent: () => null,
};

export default rangeField;
