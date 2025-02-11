import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEventHandler, Suspense, useState } from "react";
// import { MdAdd } from "react-icons/md";

import { FIELDS, type Field } from "@/components/fields";
import { Modal } from "@/components/modal";
import LeftArrow from "@/components/icons/left-arrow";
import type { DateFieldSettings } from "@/components/fields/dates/types";
import DateNewThingComponent from "@/components/fields/dates/newThing";
import dateField from "@/components/fields/dates";
import { MdDragIndicator } from "react-icons/md";
import { addThing } from "@/components/db/thing";

export const Route = createFileRoute("/_app/app_/new")({
	component: RouteComponent,
});

interface AddThingField<T> extends Field<T> {
	fieldSettings?: T;
	name: string;
}

function RouteComponent() {
	const navigate = useNavigate();

	const [fields, setFields] = useState<AddThingField<unknown>[]>([]);
	const [defaultDateField, setDefaultDateField] = useState<
		AddThingField<DateFieldSettings>
	>({
		...dateField,
		name: "DefaultDate",
	});

	const [showAddFieldModal, setShowModal] = useState(false);

	const submitForm: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		try {
			const thingId = await addThing({
				name: formData.get("thingName") as string,
				default_date_schema:
					defaultDateField.fieldSettingsToSchemaString(
						defaultDateField.fieldSettings,
					),
				schema: JSON.stringify(
					fields.map((v) => ({
						id: v.id,
						name: v.name,
						schema: v.fieldSettingsToSchemaString(v.fieldSettings),
					})),
				),
			});

			navigate({
				to: "/app/$thingId",
				params: { thingId: thingId.toString() },
			});
		} catch (e) {
			console.log("Errror: ", e);
		}
	};

	return (
		<>
			<form
				className="flex w-full flex-col gap-4"
				id="newThingForm"
				onSubmit={submitForm}
			>
				<header className="mb-4 flex items-center">
					<Link to="/app" className="h-8 w-8">
						<LeftArrow className="h-full" />
					</Link>
					<h1 className="ml-4 text-2xl">
						Track some<span className="text-primary">Thing</span>
					</h1>
				</header>

				<div className="">
					<label
						id="thingNameLabel"
						htmlFor="thingNameInput"
						className="mb-2 block w-full"
					>
						Name your <span className="text-primary">thing</span>
					</label>
					<input
						className="block w-full rounded-sm bg-gray-300 px-4 py-2 dark:bg-gray-800"
						type="text"
						name="thingName"
						aria-labelledby="thingNameLabel"
						id="thingNameInput"
						placeholder="Very important thing 1"
					/>
				</div>

				<div className="rounded-sm bg-gray-800 p-4">
					<div className="mb-4 flex items-center justify-between gap-4">
						<input
							type="text"
							placeholder="Field Title"
							value="Created Date (required)"
							disabled
							className="grow border-b-2 py-2 outline-none"
						/>
					</div>
					<Suspense fallback={"Loading"}>
						<DateNewThingComponent
							fieldSettings={defaultDateField.fieldSettings}
							updateFieldData={(update) => {
								setDefaultDateField((prev) => ({
									...prev,
									fieldSettings: update,
								}));
							}}
						/>
					</Suspense>
				</div>
			</form>

			<div className="mt-4 flex w-full flex-col gap-4">
				{fields.map((field, i) => (
					<div key={i} className="rounded-sm bg-gray-800 p-4">
						<div className="mb-4 flex items-center justify-between gap-4">
							<input
								type="text"
								placeholder="Field Title"
								defaultValue={field.name}
								onChange={(e) => {
									fields[i].name = e.target.value;
									return [...fields];
								}}
								className="grow border-b-2 py-2 outline-none"
							/>
							<MdDragIndicator className="h-5 w-5" />
						</div>
						<Suspense fallback={"Loading"}>
							<field.NewThingComponent
								fieldSettings={field.fieldSettings}
								updateFieldData={(newData) =>
									setFields((fields) => {
										fields[i].fieldSettings = newData;
										return [...fields];
									})
								}
							/>
						</Suspense>
					</div>
				))}

				<button
					type="button"
					onClick={() => {
						setShowModal(true);
					}}
					className="flex w-full items-center justify-center rounded-sm border-2 border-dashed p-4 font-normal"
				>
					Add field
				</button>

				<Modal
					show={showAddFieldModal}
					onRequestClose={() => setShowModal(false)}
				>
					<h2 className="mb-4 text-2xl">Pick a Field</h2>

					<div className="grid grid-cols-[repeat(auto-fit,_minmax(60px,1fr))] gap-2">
						{Object.values(FIELDS).map((fieldType) => {
							return (
								<button
									key={`${fieldType.id}`}
									className="flex w-full flex-col items-center gap-2"
									onClick={() => {
										setFields((fields) => [
											...fields,
											{
												...fieldType,
												fieldSettings: {},
												name: `${fieldType.friendlyName()} ${fields.length}`,
											},
										]);
										setShowModal(false);
									}}
								>
									<div className="flex aspect-square w-full items-center justify-center rounded-sm bg-primary-dark p-4">
										<Suspense fallback={"Loading"}>
											<fieldType.AddMenuIcon />
										</Suspense>
									</div>
									<p className="text-sm">
										{fieldType.friendlyName()}
									</p>
								</button>
							);
						})}
					</div>

					<button
						className="mt-4 w-full rounded-sm bg-primary px-4 py-2 text-xs font-normal text-white uppercase"
						onClick={() => {
							setShowModal(false);
						}}
					>
						Close
					</button>
				</Modal>
			</div>

			<button
				type="submit"
				className="mt-4 w-full rounded-sm bg-primary px-4 py-2 text-xs font-normal text-white uppercase"
				form="newThingForm"
			>
				Add Thing
			</button>
		</>
	);
}
