import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEventHandler, Suspense, useState } from "react";

import { FIELDS } from "@/components/fields";
import { Modal } from "@/components/modal";
import LeftArrow from "@/components/icons/left-arrow";
import type { DateFieldSettings } from "@/components/fields/dates/types";
import DateNewThingComponent from "@/components/fields/dates/newThing";
import dateField from "@/components/fields/dates";
import { MdDragIndicator } from "react-icons/md";
import { addThing, checkNameExists } from "@/components/db/thing";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_app/app_/new")({
	component: RouteComponent,
});

interface AddThingField<T> {
	id: string;
	fieldSettings: T;
	name: string;
	valid: boolean;
}

function RouteComponent() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [name, setName] = useState("");
	const [defaultDateField, setDefaultDateField] = useState<
		AddThingField<DateFieldSettings>
	>({
		id: dateField.id,
		fieldSettings: dateField.getDefaultFieldSettings(),
		name: "Default Date",
		valid: true,
	});
	const [fields, setFields] = useState<AddThingField<unknown>[]>([]);

	const [showErrors, setShowErrors] = useState(false);
	const [nameError, setNameError] = useState("");

	const [showAddFieldModal, setShowModal] = useState(false);

	const [doingStuff, setDoingStuff] = useState(false);

	const validate = async () => {
		let anyErrors = false;
		if (await checkNameExists(name)) {
			anyErrors = true;
			setNameError("Name is already taken by another thing");
		}

		for (let i = 0; i < fields.length; i++) {
			anyErrors ||= !fields[i].valid;
		}

		return !anyErrors;
	};

	const submitForm: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		setShowErrors(false);
		setDoingStuff(true);

		if (await validate()) {
			try {
				const thingId = await addThing({
					name: name,
					default_date_schema: JSON.stringify(
						defaultDateField.fieldSettings,
					),
					schema: JSON.stringify(
						fields.map((v) => ({
							id: v.id,
							name: v.name,
							fieldSettings: v.fieldSettings,
						})),
					),
				});

				queryClient.invalidateQueries({ queryKey: ["things"] });

				navigate({
					to: "/app/$thingId",
					params: { thingId: thingId.toString() },
				});
			} catch (e) {
				console.log("Errror: ", e);
			}
		} else {
			setShowErrors(true);
		}

		setDoingStuff(false);
	};

	return (
		<>
			<form
				className="flex w-full flex-col gap-4"
				id="newThingForm"
				onSubmit={submitForm}
			>
				<header className="sticky top-0 mb-4 flex items-center">
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
						defaultValue={name}
						onChange={(e) => {
							setName(e.target.value);
							setNameError("");
						}}
						className="block w-full rounded-sm border-2 border-gray-800 bg-gray-300 px-4 py-2 outline-none focus-visible:border-current dark:bg-gray-800"
						type="text"
						name="thingName"
						aria-labelledby="thingNameLabel"
						id="thingNameInput"
						placeholder="Very important thing 1"
						required
					/>
					<p className="mt-2 text-sm text-red-500 empty:hidden">
						{showErrors && (!name ? "Name is required" : nameError)}
					</p>
				</div>

				<div className="rounded-sm bg-gray-800 p-4">
					<div className="mb-4 flex items-center justify-between gap-4">
						<input
							type="text"
							placeholder="Field Title"
							name="defDate-fieldName"
							value="Created Date (required)"
							disabled
							className="grow border-b-2 py-2 outline-none"
						/>
					</div>
					<Suspense fallback={"Loading"}>
						<DateNewThingComponent
							defaultFieldSettings={
								defaultDateField.fieldSettings
							}
							updateFieldSettings={(update) => {
								setDefaultDateField((prev) => ({
									...prev,
									fieldSettings: update,
								}));
							}}
							updateValidity={(valid) => {
								setDefaultDateField((prev) => ({
									...prev,
									valid,
								}));
							}}
							showErrors={showErrors}
							disableInteraction={doingStuff}
							disambigKey="defDate"
						/>
					</Suspense>
				</div>

				<div className="mt-4 flex w-full flex-col gap-4">
					{fields.map((field, i) => {
						const fieldType = FIELDS[field.id];
						return (
							<div key={i} className="rounded-sm bg-gray-800 p-4">
								<div className="mb-4 flex items-center justify-between gap-4">
									<input
										type="text"
										placeholder="Field Title"
										defaultValue={field.name}
										name={`${i}-fieldName`}
										onChange={(e) => {
											fields[i].name = e.target.value;
											return [...fields];
										}}
										className="grow border-b-2 py-2 outline-none"
										aria-label={`Title of ${fieldType.friendlyName()} field`}
									/>
									<MdDragIndicator className="h-5 w-5" />
								</div>
								<Suspense fallback={"Loading"}>
									<fieldType.NewThingComponent
										defaultFieldSettings={
											field.fieldSettings
										}
										updateFieldSettings={(newData) =>
											setFields((fields) => {
												fields[i].fieldSettings =
													newData;
												return [...fields];
											})
										}
										updateValidity={(valid) =>
											setFields((fields) => {
												fields[i].valid = valid;
												return [...fields];
											})
										}
										showErrors={showErrors}
										disableInteraction={doingStuff}
										disambigKey={i}
									/>
								</Suspense>
							</div>
						);
					})}

					<button
						type="button"
						onClick={() => {
							setShowModal(true);
						}}
						disabled={doingStuff}
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
													id: fieldType.id,
													fieldSettings:
														fieldType.getDefaultFieldSettings(),
													name: `${fieldType.friendlyName()} ${fields.length}`,
													valid: true,
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
					disabled={doingStuff}
				>
					Add Thing
				</button>
			</form>
		</>
	);
}
