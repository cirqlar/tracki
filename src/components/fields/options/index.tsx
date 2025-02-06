import type { Field } from "@/components/fields";
import {
	useEffect,
	useState,
	experimental_useEffectEvent as useEffectEvent,
	useRef,
} from "react";
import { MdApps } from "react-icons/md";

export interface OptionsSettings {
	options: string[];
	selectMultiple: boolean;
}

type OptionsField = Field<OptionsSettings>;

const NewThingComponent: OptionsField["NewThingComponent"] = ({
	updateFieldData,
}) => {
	const [options, setOptions] = useState<string[]>([]);
	const [selectMultiple, setSelectMultiple] = useState(false);

	const optionInputRef = useRef<HTMLInputElement>(null);

	const updateData = useEffectEvent((fieldSettings: OptionsSettings) => {
		updateFieldData(fieldSettings);
	});

	useEffect(() => {
		updateData({
			options,
			selectMultiple,
		});
	}, [options, selectMultiple]);

	return (
		<div className="rounded-sm bg-gray-800 p-4">
			<p className="mb-4">Options Settings</p>

			<fieldset className="flex w-full flex-col gap-2">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (!options.includes(optionInputRef.current!.value)) {
							setOptions((prev) => [
								...prev,
								optionInputRef.current!.value,
							]);
						}
						optionInputRef.current!.value = "";
					}}
				>
					<label className="flex items-center gap-2">
						Add Option
						<input
							ref={optionInputRef}
							type="text"
							placeholder="Happy :)"
							className="border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
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
						defaultChecked={selectMultiple}
						onChange={(e) => setSelectMultiple(e.target.checked)}
					/>
					Select Multiple
				</label>
			</fieldset>
		</div>
	);
};

const AddMenuIcon: OptionsField["AddMenuIcon"] = () => {
	return <MdApps className="h-full w-full" />;
};

const optionsField: OptionsField = {
	id: "fields/options/0001",
	friendlyName: () => "Options",
	fieldSettingsToSchemaString: (optionsSettings) =>
		JSON.stringify(optionsSettings),
	NewThingComponent,
	AddMenuIcon,
	AddEntryComponent: () => null,
	DisplayEntryComponent: () => null,
};

export default optionsField;
