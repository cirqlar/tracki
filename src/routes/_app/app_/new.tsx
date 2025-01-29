import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEventHandler, useState } from "react";

import { FIELDS, type Field } from "@/components/fields";
import { Modal } from "@/components/modal";
import LeftArrow from "@/components/icons/left-arrow";

export const Route = createFileRoute("/_app/app_/new")({
	component: RouteComponent,
});

interface AddThingField<T> extends Field<T> {
	fieldData: T;
	variant: string;
	name: string;
}

function RouteComponent() {
	const [fields, setFields] = useState<AddThingField<unknown>[]>([]);
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
		<form className="flex w-full flex-col gap-4" onSubmit={submitForm}>
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

			{fields.map((field, i) => (
				<div key={i}>
					Field {i} is a {field.friendlyName(field.variant)} field.
					<field.NewThingComponent
						fieldSettings={field.fieldData}
						variant={field.variant}
						updateFieldData={(newData) =>
							setFields((fields) => {
								fields[i].fieldData = newData;
								return [...fields];
							})
						}
					/>
				</div>
			))}

			<div className="flex w-full items-center justify-center rounded-sm border-2 border-dashed p-4">
				<button
					type="button"
					className="font-normal"
					onClick={() => {
						setShowModal(true);
					}}
				>
					Add field
				</button>
			</div>

			<button
				type="submit"
				className="mb-4 w-full rounded-sm bg-primary px-4 py-2 text-xs font-normal text-white uppercase"
			>
				Add Thing
			</button>

			<Modal
				show={showAddFieldModal}
				onRequestClose={() => setShowModal(false)}
			>
				<h2 className="mb-4 text-2xl">Pick a Field</h2>

				<div className="grid grid-cols-[repeat(auto-fit,_minmax(60px,1fr))] gap-2">
					{FIELDS.map((fieldType) => {
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
												fieldData: {},
												name: "",
											},
										]);
										setShowModal(false);
									}}
								>
									<div className="flex aspect-square w-full items-center justify-center rounded-sm bg-primary-dark p-4">
										<fieldType.AddMenuIcon
											variant={fieldType.variants}
										/>
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
											fieldData: {},
											name: "",
										},
									]);
									setShowModal(false);
								}}
							>
								<div className="flex aspect-square w-full items-center justify-center rounded-sm bg-primary-dark p-4">
									<fieldType.AddMenuIcon variant={variant} />
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
						setFields([]);
						setShowModal(false);
					}}
				>
					Close
				</button>
			</Modal>
		</form>
	);
}
