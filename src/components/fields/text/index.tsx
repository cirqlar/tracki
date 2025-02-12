import type { Field } from "@/components/fields";
import {
	useEffect,
	useState,
	experimental_useEffectEvent as useEffectEvent,
	useMemo,
} from "react";
import { MdNotes } from "react-icons/md";

export interface TextSettings {
	short: boolean;
}

type TextField = Field<TextSettings>;

const NewThingComponent: TextField["NewThingComponent"] = ({
	updateFieldData,
}) => {
	const [short, setShort] = useState(true);

	const updateData = useEffectEvent((fieldSettings: TextSettings) => {
		updateFieldData(fieldSettings);
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

const AddEntryComponent: TextField["AddEntryComponent"] = ({ schema }) => {
	const unLeaded = useMemo(
		() => JSON.parse(schema) as TextSettings,
		[schema],
	);

	if (unLeaded.short) {
		return (
			<input
				type="text"
				placeholder="Write in me"
				className="rounded-sm border-2 border-gray-800 bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-gray-800"
			/>
		);
	} else {
		return (
			<textarea
				className="min-h-24 rounded-sm border-2 border-gray-800 bg-white px-4 py-4 outline-none focus-visible:border-current dark:bg-gray-800"
				placeholder="Write in me"
			/>
		);
	}
};

const textField: TextField = {
	id: "fields/text/0001",
	friendlyName: () => "Text",
	fieldSettingsToSchemaString: (textSettings) => JSON.stringify(textSettings),
	NewThingComponent,
	AddMenuIcon,
	AddEntryComponent,
	DisplayEntryComponent: () => null,
};

export default textField;
