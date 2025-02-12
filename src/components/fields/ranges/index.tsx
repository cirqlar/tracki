import type { Field } from "@/components/fields";
import {
	useEffect,
	useState,
	experimental_useEffectEvent as useEffectEvent,
	useRef,
	useMemo,
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

const AddEntryComponent: RangeField["AddEntryComponent"] = ({ schema }) => {
	const unLeaded = useMemo(
		() => JSON.parse(schema) as RangeSettings,
		[schema],
	);

	if (unLeaded.type === "number") {
		return (
			<div className="flex w-full gap-2">
				<p>{unLeaded.start}</p>
				<input
					className="grow"
					type="range"
					min={unLeaded.start}
					max={unLeaded.end}
					step={unLeaded.step || "any"}
				/>
				<p>{unLeaded.end}</p>
			</div>
		);
	} else {
		return (
			<div className="relative flex h-15 w-full flex-col gap-2">
				<input
					className="h-5 grow"
					type="range"
					min={1}
					max={unLeaded.options.length}
					step={unLeaded.allowInbetween ? "any" : 1}
				/>
				<div className="relative mx-1.75 h-8">
					{unLeaded.options.map((opt, i) => (
						<div
							key={i}
							className="group absolute top-0 bottom-0 left-(--left) flex flex-col not-first-of-type:not-last-of-type:-translate-x-1/2 last-of-type:right-0"
							style={{
								"--left": `${i === unLeaded.options.length - 1 ? "" : i * (100 / (unLeaded.options.length - 1))}%`,
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
		);
	}
};

const rangeField: RangeField = {
	id: "fields/range/0001",
	friendlyName: () => "Range",
	fieldSettingsToSchemaString: (rangeSettings) =>
		JSON.stringify(rangeSettings),
	NewThingComponent,
	AddMenuIcon,
	AddEntryComponent,
	DisplayEntryComponent: () => null,
};

export default rangeField;
