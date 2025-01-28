import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { type Field } from "@/components/fields";
import { Modal } from "@/components/modal";
import LeftArrow from "@/components/icons/left-arrow";

export const Route = createFileRoute("/_app/app_/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const [fields, setFields] = useState<Field[]>([]);
	const [showAddFieldModal, setShowModal] = useState(false);

	return (
		<form className="flex w-full flex-col gap-4">
			<header className="mb-4 flex items-center">
				<Link to="/app" className="h-8 w-8">
					<LeftArrow className="h-full" />
				</Link>
				<h1 className="ml-4 text-2xl">
					Track some<span className="text-primary">Thing</span>
				</h1>
			</header>

			{fields.map((field, i) => (
				<div key={i}>
					Field{i} is {field.friendlyName}
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
				<div>Modal Content</div>

				<button
					className="mt-4 w-full rounded-sm bg-primary px-4 py-2 text-xs font-normal text-white uppercase"
					onClick={() => {
						setFields([]);
						setShowModal(false);
					}}
				>
					Why even?
				</button>
			</Modal>
		</form>
	);
}
