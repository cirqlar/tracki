import type { Field } from "@/components/fields";
import {
	useEffect,
	useState,
	experimental_useEffectEvent as useEffectEvent,
} from "react";
import { MdNotes } from "react-icons/md";

export type TextSettings = {
	short: boolean;
	required: boolean;
};

export type TextData = {
	value: string;
};

type TextField = Field<TextSettings, TextData>;

const NewThingComponent: TextField["NewThingComponent"] = ({
	defaultFieldSettings: dfs,
	updateFieldSettings,
}) => {
	const [short, setShort] = useState(dfs.short);
	const [required, setRequired] = useState(dfs.required);

	const updateData = useEffectEvent(updateFieldSettings);

	useEffect(() => {
		updateData({
			short,
			required,
		});
	}, [required, short]);

	return (
		<div>
			<p className="mb-4">Text Settings</p>

			<label className="flex items-center gap-2">
				<input
					type="checkbox"
					defaultChecked={short}
					onChange={(e) => setShort(e.target.checked)}
				/>
				Short Text
			</label>
			<label className="flex items-center gap-2">
				<input
					type="checkbox"
					defaultChecked={required}
					onChange={(e) => setRequired(e.target.checked)}
				/>
				Required
			</label>
		</div>
	);
};

const AddMenuIcon: TextField["AddMenuIcon"] = () => {
	return <MdNotes className="h-full w-full" />;
};

const AddEntryComponent: TextField["AddEntryComponent"] = ({
	fieldSettings,
	fieldLabel,
	defaultFieldData: dfd,
	updateFieldData,
	updateValidity,
	showErrors,
}) => {
	const [value, setValue] = useState(dfd.value);

	const updateData = useEffectEvent(updateFieldData);
	const setIsValid = useEffectEvent(updateValidity);

	const readFieldSettings = useEffectEvent(() => fieldSettings);

	useEffect(() => {
		updateData({ value });

		setIsValid(!!value || !readFieldSettings().required);
	}, [value]);

	if (fieldSettings.short) {
		return (
			<div className="w-full">
				<input
					id={fieldLabel}
					required={fieldSettings.required}
					type="text"
					placeholder="Write in me"
					className="rounded-sm border-2 border-gray-800 bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-gray-800"
					defaultValue={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<p className="mt-2 text-sm text-red-500 empty:hidden">
					{showErrors &&
						!value &&
						fieldSettings.required &&
						"This field is required"}
				</p>
			</div>
		);
	} else {
		return (
			<div className="w-full">
				<textarea
					id={fieldLabel}
					required={fieldSettings.required}
					className="min-h-24 rounded-sm border-2 border-gray-800 bg-white px-4 py-4 outline-none focus-visible:border-current dark:bg-gray-800"
					placeholder="Write in me"
					defaultValue={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<p className="mt-2 text-sm text-red-500 empty:hidden">
					{showErrors &&
						!value &&
						fieldSettings.required &&
						"This field is required"}
				</p>
			</div>
		);
	}
};

const textField: TextField = {
	id: "fields/text/0001",
	friendlyName: () => "Text",
	getDefaultFieldSettings: () => ({ short: true, required: true }),
	getDefaultEntry: () => ({ value: "" }),
	NewThingComponent,
	AddMenuIcon,
	AddEntryComponent,
	DisplayEntryComponent: () => null,
};

export default textField;
