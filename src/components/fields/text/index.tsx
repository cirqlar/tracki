import type { Field } from "@/components/fields";
import {
	useEffect,
	useState,
	experimental_useEffectEvent as useEffectEvent,
} from "react";
import { MdNotes } from "react-icons/md";

export interface TextSettings {
	short: boolean;
}

export type TextData = string;

type TextField = Field<TextSettings, TextData>;

const NewThingComponent: TextField["NewThingComponent"] = ({
	defaultFieldSettings: dfs,
	updateFieldSettings,
}) => {
	const [short, setShort] = useState(dfs.short);

	const updateData = useEffectEvent((fieldSettings: TextSettings) => {
		updateFieldSettings(fieldSettings);
	});

	useEffect(() => {
		updateData({
			short,
		});
	}, [short]);

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
		</div>
	);
};

const AddMenuIcon: TextField["AddMenuIcon"] = () => {
	return <MdNotes className="h-full w-full" />;
};

const AddEntryComponent: TextField["AddEntryComponent"] = ({
	fieldSettings,
	fieldLabel,
}) => {
	if (fieldSettings.short) {
		return (
			<input
				id={fieldLabel}
				type="text"
				placeholder="Write in me"
				className="rounded-sm border-2 border-gray-800 bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-gray-800"
			/>
		);
	} else {
		return (
			<textarea
				id={fieldLabel}
				className="min-h-24 rounded-sm border-2 border-gray-800 bg-white px-4 py-4 outline-none focus-visible:border-current dark:bg-gray-800"
				placeholder="Write in me"
			/>
		);
	}
};

const textField: TextField = {
	id: "fields/text/0001",
	friendlyName: () => "Text",
	getDefaultFieldSettings: () => ({ short: true }),
	getDefaultEntry: () => "",
	NewThingComponent,
	AddMenuIcon,
	AddEntryComponent,
	DisplayEntryComponent: () => null,
};

export default textField;
