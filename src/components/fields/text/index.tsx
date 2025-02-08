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

const textField: TextField = {
	id: "fields/text/0001",
	friendlyName: () => "Text",
	fieldSettingsToSchemaString: (textSettings) => JSON.stringify(textSettings),
	NewThingComponent,
	AddMenuIcon,
	AddEntryComponent: () => null,
	DisplayEntryComponent: () => null,
};

export default textField;
