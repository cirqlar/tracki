import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEventHandler, Suspense, useState } from "react";

import { FIELDS } from "@/components/fields";
import { Modal } from "@/components/modal";
import LeftArrow from "@/components/icons/left-arrow";
import dateField from "@/components/fields/dates";
import { MdDragIndicator } from "react-icons/md";
import { addThing, checkNameExists } from "@/components/db/thing";
import { useQueryClient } from "@tanstack/react-query";
import { type ThingField } from "@/components/db";

export const Route = createFileRoute("/_app/app_/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [name, setName] = useState("");
	const [fields, setFields] = useState<ThingField<unknown>[]>([
		{
			field_id: dateField.id,
			name: "Date & Time",
			settings: dateField.getDefaultFieldSettings(),
			key: "",
		},
	]);
	const [validity, setValidity] = useState([true]);

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

		for (let i = 0; i < validity.length; i++) {
			anyErrors ||= !validity[i];
		}

		return !anyErrors;
	};

	const submitForm: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		setShowErrors(false);
		setDoingStuff(true);

		if (await validate()) {
			try {
				// TODO: Gen keys
				const fieldsWithKeys = fields.map((field, i) => ({
					...field,
					key: `${i}${i}${i}${i}`,
				}));

				const thingId = await addThing({
					name: name,
					fields: fieldsWithKeys,
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

				{/* <div className="rounded-sm bg-gray-800 p-4">
					<div className="mb-4 flex items-center justify-between gap-4">
						<input
							type="text"
							placeholder="Field Title"
							name="defDate-fieldName"
							defaultValue={fields[0].name}
							// value="Created Date (required)"
							disabled
							className="grow border-b-2 py-2 outline-none"
						/>
					</div>
					<Suspense fallback={"Loading"}>
						<DateNewThingComponent
							defaultFieldSettings={
								fields[0].settings as DateFieldSettings
							}
							updateFieldSettings={(update) => {
								setFields((prev) => {
									prev[0] = {
										...prev[0],
										settings: update,
									};

									return [...prev];
								});
							}}
							updateValidity={(valid) => {
								setValidity(prev => {
									prev[0] = 
								})
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
				</div> */}

				<div className="mt-4 flex w-full flex-col gap-4">
					{fields.map((field, i) => {
						const fieldType = FIELDS[field.field_id];
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
										disabled={i === 0}
										className="grow border-b-2 py-2 outline-none"
										aria-label={`Title of ${fieldType.friendlyName()} field`}
									/>
									{i !== 0 && (
										<MdDragIndicator className="h-5 w-5" />
									)}
								</div>
								<Suspense fallback={"Loading"}>
									<fieldType.NewThingComponent
										defaultFieldSettings={field.settings}
										updateFieldSettings={(newData) =>
											setFields((fields) => {
												fields[i].settings = newData;
												return [...fields];
											})
										}
										updateValidity={(valid) =>
											setValidity((prev) => {
												prev[i] = valid;
												return [...prev];
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
													field_id: fieldType.id,
													settings:
														fieldType.getDefaultFieldSettings(),
													name: `${fieldType.friendlyName()} ${fields.length}`,
													key: "",
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
