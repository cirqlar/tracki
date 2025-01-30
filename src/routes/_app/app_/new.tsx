import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEventHandler, Suspense, useState } from "react";

import { FIELDS, type Field } from "@/components/fields";
import { Modal } from "@/components/modal";
import LeftArrow from "@/components/icons/left-arrow";
import { DateSettings } from "@/components/fields/dates/types";
import DateNewThingComponent from "@/components/fields/dates/newThing";
import dateField from "@/components/fields/dates";

export const Route = createFileRoute("/_app/app_/new")({
	component: RouteComponent,
});

interface AddThingField<T> extends Field<T> {
	fieldSettings?: T;
	variant: string;
	name: string;
}

function RouteComponent() {
	const [fields, setFields] = useState<AddThingField<unknown>[]>([]);
	const [defaultDateField, setDefaultDateField] = useState<
		AddThingField<DateSettings>
	>({ ...dateField, variant: "default", name: "DefaultDate" });

	const [showAddFieldModal, setShowModal] = useState(false);

	const submitForm: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const formValues = {
			name: formData.get("thingName"),
		};

		console.log("Submitting form game us", formValues);
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

				<div>
					<div className="mb-2 flex w-full items-baseline justify-between">
						<p className="">Created Date (required)</p>

						<fieldset>
							<label>
								Date & Time
								<input
									onChange={(e) => {
										if (e.target.checked)
											setDefaultDateField((prev) => ({
												...prev,
												variant: "default",
											}));
									}}
									type="radio"
									name="defaultDateVariant"
									id="Default"
									className="hidden"
								/>
							</label>
							<label>
								Date
								<input
									onChange={(e) => {
										if (e.target.checked)
											setDefaultDateField((prev) => ({
												...prev,
												variant: "date-only",
											}));
									}}
									type="radio"
									name="defaultDateVariant"
									id="Date"
									className="hidden"
								/>
							</label>
							<label>
								Time
								<input
									onChange={(e) => {
										if (e.target.checked)
											setDefaultDateField((prev) => ({
												...prev,
												variant: "time-only",
											}));
									}}
									type="radio"
									name="defaultDateVariant"
									id="Time"
									className="hidden"
								/>
							</label>
						</fieldset>
					</div>
					<Suspense fallback={"Loading"}>
						<DateNewThingComponent
							variant={defaultDateField.variant}
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
					<div key={i}>
						Field {i} is a {field.friendlyName(field.variant)}{" "}
						field.
						<Suspense fallback={"Loading"}>
							<field.NewThingComponent
								fieldSettings={field.fieldSettings}
								variant={field.variant}
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
							if (typeof fieldType.variants === "string") {
								return (
									<button
										className="flex w-full flex-col items-center gap-2"
										onClick={() => {
											setFields((fields) => [
												...fields,
												{
													...fieldType,
													variant:
														fieldType.variants as string,
													fieldSettings: {},
													name: "",
												},
											]);
											setShowModal(false);
										}}
									>
										<div className="flex aspect-square w-full items-center justify-center rounded-sm bg-primary-dark p-4">
											<Suspense fallback={"Loading"}>
												<fieldType.AddMenuIcon
													variant={fieldType.variants}
												/>
											</Suspense>
										</div>
										<p className="text-sm">
											{fieldType.friendlyName(
												fieldType.variants,
											)}
										</p>
									</button>
								);
							}

							return fieldType.variants.map((variant) => (
								<button
									key={`${fieldType.id}-${variant}`}
									className="flex w-full flex-col items-center gap-2"
									onClick={() => {
										setFields((fields) => [
											...fields,
											{
												...fieldType,
												variant,
												fieldSettings: {},
												name: "",
											},
										]);
										setShowModal(false);
									}}
								>
									<div className="flex aspect-square w-full items-center justify-center rounded-sm bg-primary-dark p-4">
										<Suspense fallback={"Loading"}>
											<fieldType.AddMenuIcon
												variant={variant}
											/>
										</Suspense>
									</div>
									<p className="text-sm">
										{fieldType.friendlyName(variant)}
									</p>
								</button>
							));
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
