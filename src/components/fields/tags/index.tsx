import type { Field, TransformedData } from "@/components/fields";
import Select from "@/components/form/select";
import {
	useEffect,
	useState,
	experimental_useEffectEvent as useEffectEvent,
	useRef,
} from "react";
import { MdApps, MdClose } from "react-icons/md";

export interface TagsSettings {
	tags: string[];
	selectMultiple: boolean;
}

export interface TagsData {
	selected: string[];
}

type TagsField = Field<TagsSettings, TagsData>;

const NewThingComponent: TagsField["NewThingComponent"] = ({
	defaultFieldSettings,
	updateFieldSettings,
}) => {
	const [tags, setTags] = useState<string[]>(defaultFieldSettings.tags);
	const [selectMultiple, setSelectMultiple] = useState(
		defaultFieldSettings.selectMultiple,
	);

	const optionInputRef = useRef<HTMLInputElement>(null);

	const updateData = useEffectEvent((fieldSettings: TagsSettings) => {
		updateFieldSettings(fieldSettings);
	});

	useEffect(() => {
		updateData({
			tags,
			selectMultiple,
		});
	}, [tags, selectMultiple]);

	return (
		<div>
			<p className="mb-4">Tags Settings</p>

			<fieldset className="flex w-full flex-col gap-2">
				<label className="flex items-center gap-2">
					Add Tag
					<input
						ref={optionInputRef}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();

								if (
									optionInputRef.current!.value &&
									!tags.includes(
										optionInputRef.current!.value,
									)
								) {
									setTags((prev) => [
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
					{tags.map((val, i) => (
						<div
							key={val}
							className="flex items-center gap-2 rounded-sm bg-white px-4 py-2 text-black"
						>
							<p>{val}</p>
							<button
								aria-label="Remove Tag"
								onClick={() =>
									setTags((prev) => {
										prev.splice(i, 1);
										return [...prev];
									})
								}
							>
								<MdClose />
							</button>
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

const AddMenuIcon: TagsField["AddMenuIcon"] = () => {
	return <MdApps className="h-full w-full" />;
};

const AddEntryComponent: TagsField["AddEntryComponent"] = ({
	defaultFieldData: dfd,
	fieldSettings,
	disableInteraction,
	...props
}) => {
	const [selected, setSelected] = useState(dfd.selected);

	const updateData = useEffectEvent(props.updateFieldData);

	useEffect(() => {
		updateData({ selected });
	}, [selected]);

	return (
		<div>
			{fieldSettings.selectMultiple ? (
				<select
					defaultValue={selected}
					className="border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
					onChange={(e) => console.log(e.target.value)}
					disabled={disableInteraction}
					multiple
				>
					{fieldSettings.tags.map((t) => (
						<option key={t} value={t}>
							{t}
						</option>
					))}
				</select>
			) : (
				<Select
					options={fieldSettings.tags}
					className="border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
					defaultValue={selected[0]}
					disabled={disableInteraction}
					onChange={(e) => setSelected([e.target.value])}
				/>
			)}
		</div>
	);
};

const tagsField: TagsField = {
	id: "fields/tags/0001",
	friendlyName: () => "Tags",
	canProvideData: true,
	useDataName: true,
	transformData: (data, settings) => {
		const obj: TransformedData = {
			fields: settings.tags,
		};

		for (let i = 0; i < settings.tags.length; i++) {
			const element = settings.tags[i];
			obj[`d_${element}`] = data.selected.includes(element) ? 1 : 0;
		}

		return obj;
	},
	getMaxValue: () => 1,
	defaultAggregation: "addition",
	getDefaultFieldSettings: () => ({ tags: [], selectMultiple: false }),
	getDefaultEntry: () => ({ selected: [] }),
	NewThingComponent,
	AddMenuIcon,
	AddEntryComponent,
	DisplayEntryComponent: () => null,
};

export default tagsField;
