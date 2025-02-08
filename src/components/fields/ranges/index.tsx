import type { Field } from "@/components/fields";
import {
	useEffect,
	useState,
	experimental_useEffectEvent as useEffectEvent,
	useRef,
} from "react";
import { MdLinearScale } from "react-icons/md";

export type RangeSettings =
	| {
			type: "number";
			start: number;
			end: number;
			step: number;
	  }
	| {
			type: "text";
			options: string[];
			allowInbetween: boolean;
	  };

export interface RangeSettingss {
	start: number;
	end: number;
	step: number;
}

type RangeField = Field<RangeSettings>;

const NewThingComponent: RangeField["NewThingComponent"] = ({
	updateFieldData,
}) => {
	const optionInputRef = useRef<HTMLInputElement>(null);

	const [type, setType] = useState<RangeSettings["type"]>("number");

	// Number State
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(0);
	const [step, setStep] = useState(0);

	// Text state
	const [options, setOptions] = useState<string[]>([]);
	const [allowInbetween, setAllow] = useState(false);

	const updateData = useEffectEvent((fieldSettings: RangeSettings) => {
		updateFieldData(fieldSettings);
	});

	useEffect(() => {
		if (type === "number") {
			updateData({
				type,
				start,
				end,
				step,
			});
		} else {
			updateData({
				type,
				options,
				allowInbetween,
			});
		}
	}, [type, start, end, step, options, allowInbetween]);

	return (
		<div>
			<p className="mb-4">Range Settings</p>

			<div className="mb-2 grid grid-cols-2 rounded-lg border-2">
				<label className="border-r-2 px-4 py-2 text-center has-checked:bg-white/30">
					Numbers
					<input
						type="radio"
						name="rangeType"
						className="hidden"
						defaultChecked={true}
						onChange={(e) => e.target.checked && setType("number")}
					/>
				</label>
				<label className="px-4 py-2 text-center has-checked:bg-white/30">
					Custom
					<input
						type="radio"
						name="rangeType"
						className="hidden"
						onChange={(e) => e.target.checked && setType("text")}
					/>
				</label>
			</div>

			{type === "number" ? (
				<fieldset className="grid w-full grid-cols-[auto_1fr] gap-2">
					<label className="col-span-2 grid grid-cols-subgrid items-center">
						Start
						<input
							type="number"
							defaultValue={start}
							onChange={(e) =>
								setStart(e.target.valueAsNumber || 0)
							}
							className="border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
						/>
					</label>
					<label className="col-span-2 grid grid-cols-subgrid items-center">
						End
						<input
							type="number"
							defaultValue={end}
							onChange={(e) =>
								setEnd(e.target.valueAsNumber || 0)
							}
							className="border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
						/>
					</label>
					<label className="col-span-2 grid grid-cols-subgrid items-center">
						Step
						<input
							type="number"
							defaultValue={step}
							onChange={(e) =>
								setStep(e.target.valueAsNumber || 0)
							}
							className="border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
						/>
					</label>
				</fieldset>
			) : (
				<fieldset className="flex w-full flex-col gap-2">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							if (
								!options.includes(optionInputRef.current!.value)
							) {
								setOptions((prev) => [
									...prev,
									optionInputRef.current!.value,
								]);
							}
							optionInputRef.current!.value = "";
						}}
					>
						<label className="flex items-center gap-2">
							Add Label
							<input
								ref={optionInputRef}
								type="text"
								placeholder="Happy :)"
								className="grow border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
							/>
						</label>
					</form>
					<div className="flex flex-wrap gap-2">
						{options.map((val) => (
							<div
								key={val}
								className="rounded-sm bg-white px-4 py-2 text-black"
							>
								{val}
							</div>
						))}
					</div>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							defaultChecked={allowInbetween}
							onChange={(e) => setAllow(e.target.checked)}
						/>
						Allow picking spots inbetween
					</label>
				</fieldset>
			)}
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
