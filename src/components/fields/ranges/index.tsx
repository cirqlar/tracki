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

export interface RangeData {
	value: number;
}

type RangeField = Field<RangeSettings, RangeData>;

const NewThingComponent: RangeField["NewThingComponent"] = ({
	defaultFieldSettings: dfs,
	updateFieldSettings,
	updateValidity,
	showErrors,
}) => {
	const optionInputRef = useRef<HTMLInputElement>(null);

	const [type, setType] = useState<RangeSettings["type"]>(dfs.type);

	// Number State
	const [start, setStart] = useState(dfs.type === "number" ? dfs.start : 0);
	const [end, setEnd] = useState(dfs.type === "number" ? dfs.end : 0);
	const [step, setStep] = useState(dfs.type === "number" ? dfs.step : 0);

	// Text state
	const [options, setOptions] = useState<string[]>(
		dfs.type === "text" ? dfs.options : [],
	);
	const [allowInbetween, setAllow] = useState(
		dfs.type === "text" ? dfs.allowInbetween : false,
	);

	const [error, setError] = useState("");

	const updateData = useEffectEvent(updateFieldSettings);
	const setIsValid = useEffectEvent(updateValidity);

	useEffect(() => {
		let newData: RangeSettings;
		if (type === "number") {
			newData = {
				type,
				start,
				end,
				step,
			};
		} else {
			newData = {
				type,
				options,
				allowInbetween,
			};
		}

		updateData(newData);

		if (newData.type === "number") {
			if (newData.start >= newData.end) {
				setIsValid(false);
				setError("Start has to be smaller than End");
			} else if (newData.step > newData.end - newData.start) {
				setIsValid(false);
				setError(
					"Step can't be larger than the difference between Start and End",
				);
			} else {
				setIsValid(true);
				setError("");
			}
		} else {
			if (newData.options.length < 2) {
				setIsValid(false);
				setError("There must be at least two options");
			} else {
				setIsValid(true);
				setError("");
			}
		}
	}, [type, start, end, step, options, allowInbetween]);

	return (
		<div>
			<p className="mb-4">Range Settings</p>

			<div className="mb-2 grid grid-cols-2">
				<label className="rounded-l-sm border-2 border-r-0 px-4 py-2 text-center focus-within:border-primary has-checked:border-r-2 has-checked:bg-white/30">
					Numbers
					<input
						type="radio"
						name="rangeType"
						className="h-0 w-0 opacity-0 outline-none"
						defaultChecked={true}
						onChange={(e) => e.target.checked && setType("number")}
					/>
				</label>
				<label className="rounded-r-sm border-2 border-l-0 px-4 py-2 text-center focus-within:border-primary has-checked:border-l-2 has-checked:bg-white/30">
					Custom
					<input
						type="radio"
						name="rangeType"
						className="h-0 w-0 opacity-0 outline-none"
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
					<p className="text-sm text-red-500 empty:hidden">
						{showErrors && error}
					</p>
				</fieldset>
			) : (
				<fieldset className="flex w-full flex-col gap-2">
					<label className="flex items-center gap-2">
						Add Label
						<input
							ref={optionInputRef}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();

									if (
										optionInputRef.current!.value &&
										!options.includes(
											optionInputRef.current!.value,
										)
									) {
										setOptions((prev) => [
											...prev,
											optionInputRef.current!.value,
										]);
									}
									optionInputRef.current!.value = "";
								}
							}}
							type="text"
							placeholder="Happy :)"
							className="grow border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
						/>
					</label>
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
					<p className="text-sm text-red-500 empty:hidden">
						{showErrors && error}
					</p>
				</fieldset>
			)}
		</div>
	);
};

const AddMenuIcon: RangeField["AddMenuIcon"] = () => {
	return <MdLinearScale className="h-full w-full" />;
};

const AddEntryComponent: RangeField["AddEntryComponent"] = ({
	fieldSettings,
	defaultFieldData: dfd,
	fieldLabel,
	updateFieldData,
	updateValidity,
	showErrors,
}) => {
	const [value, setValue] = useState(dfd.value);

	const updateData = useEffectEvent(updateFieldData);
	const setIsValid = useEffectEvent(updateValidity);

	const readFieldSettings = useEffectEvent(() => fieldSettings);

	const [error, setError] = useState("");

	useEffect(() => {
		updateData({ value });

		let min: number;
		let max: number;

		const fSetts = readFieldSettings();

		if (fSetts.type === "number") {
			min = fSetts.start;
			max = fSetts.end;
		} else {
			min = 1;
			max = fSetts.options.length;
		}

		setIsValid(value >= min && value <= max);
		if (value < min) {
			setError("Value must be higher than " + (min - 1));
		} else if (value > max) {
			setError("Value must be lower than " + (max + 1));
		}
	}, [value]);

	if (fieldSettings.type === "number") {
		return (
			<div className="w-full">
				<div className="flex w-full gap-2">
					<p>{fieldSettings.start}</p>
					<input
						id={fieldLabel}
						className="grow"
						type="range"
						min={fieldSettings.start}
						max={fieldSettings.end}
						step={fieldSettings.step || "any"}
						defaultValue={value}
						onChange={(e) =>
							setValue(
								isNaN(e.target.valueAsNumber)
									? dfd.value
									: e.target.valueAsNumber,
							)
						}
					/>
					<p>{fieldSettings.end}</p>
				</div>
				<p className="mt-2 text-sm text-red-500 empty:hidden">
					{showErrors && error}
				</p>
			</div>
		);
	} else {
		return (
			<div className="w-full">
				<div className="relative flex h-15 w-full flex-col gap-2">
					<input
						id={fieldLabel}
						className="h-5 grow"
						type="range"
						min={1}
						max={fieldSettings.options.length}
						step={fieldSettings.allowInbetween ? "any" : 1}
						defaultValue={value}
						onChange={(e) =>
							setValue(
								isNaN(e.target.valueAsNumber)
									? dfd.value
									: e.target.valueAsNumber,
							)
						}
					/>
					<div className="relative mx-1.75 h-8">
						{fieldSettings.options.map((opt, i) => (
							<div
								key={i}
								className="group absolute top-0 bottom-0 left-(--left) flex flex-col not-first-of-type:not-last-of-type:-translate-x-1/2 last-of-type:right-0"
								style={{
									"--left": `${i === fieldSettings.options.length - 1 ? "" : i * (100 / (fieldSettings.options.length - 1))}%`,
								}}
							>
								<div className="mx-auto w-0 grow border border-current group-first-of-type:ml-0 group-last-of-type:mr-0"></div>
								<p className="mt-2 grow-0 text-center text-xs group-first-of-type:text-left group-last-of-type:text-right">
									{opt}
								</p>
							</div>
						))}
					</div>
				</div>
				<p className="mt-2 text-sm text-red-500 empty:hidden">
					{showErrors && error}
				</p>
			</div>
		);
	}
};

const rangeField: RangeField = {
	id: "fields/range/0001",
	friendlyName: () => "Range",
	getDefaultFieldSettings: () => ({
		type: "number",
		start: 1,
		end: 5,
		step: 1,
	}),
	getDefaultEntry: (settings) => ({
		value: settings.type === "number" ? settings.start : 1,
	}),
	NewThingComponent,
	AddMenuIcon,
	AddEntryComponent,
	DisplayEntryComponent: () => null,
};

export default rangeField;
