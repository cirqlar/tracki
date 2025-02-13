import { getThing } from "@/components/db/thing";
import { FIELDS } from "@/components/fields";
import dateField from "@/components/fields/dates";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEventHandler, useMemo, useState } from "react";

export const Route = createFileRoute("/_app/app_/$thingId_/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const { thingId } = Route.useParams();
	const { data: thing } = useQuery({
		queryKey: ["thing", thingId],
		queryFn: () => getThing(Number(thingId)),
	});

	const schema = useMemo(() => {
		if (!thing) return [];

		return JSON.parse(thing.schema) as {
			id: number;
			name: string;
			schema: string;
		}[];
	}, [thing]);

	const [defaultDateValid, setDDV] = useState(true);
	const [fieldsInfo, setFieldsInfo] = useState<boolean[]>(
		Array.from({ length: schema.length }, () => true),
	);
	const [showErrors, setShowErrors] = useState(false);

	const [doingStuff, setDoingStuff] = useState(false);

	const validate = () => {
		let anyErrors = defaultDateValid;
		for (let i = 0; i < fieldsInfo.length; i++) {
			anyErrors ||= fieldsInfo[i];
		}

		return !anyErrors;
	};

	const submit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		setShowErrors(false);
		setDoingStuff(true);

		if (validate()) {
			// do stuff
		} else {
			setShowErrors(true);
		}

		setDoingStuff(false);
	};

	if (!thing) {
		return (
			<div>
				<p>Loading</p>
			</div>
		);
	}

	return (
		<form className="flex h-full w-full flex-col gap-4" onSubmit={submit}>
			<header className="flex w-full flex-col gap-2">
				<h1 className="text-2xl">Add a new entry</h1>
				<p className="text-lg">
					For{" "}
					<Link
						to="/app/$thingId"
						params={{ thingId: thingId }}
						className="text-primary underline underline-offset-4"
					>
						{thing.name}
					</Link>
				</p>
			</header>

			<div className="flex flex-col gap-2">
				<label htmlFor="defDate-fieldLabel">Date & Time</label>
				<dateField.AddEntryComponent
					schema={thing.default_date_schema}
					updateValidity={setDDV}
					showErrors={showErrors}
					disableInteraction={doingStuff}
					disambigKey="defDate"
					fieldLabel="defDate-fieldLabel"
				/>
			</div>

			{schema.map((field, i) => {
				const fieldType = FIELDS[field.id];

				return (
					<div className="flex flex-col gap-2" key={i + 1}>
						<label htmlFor={`${i}-fieldLabel`}>{field.name}</label>
						<fieldType.AddEntryComponent
							schema={field.schema}
							updateValidity={(valid) =>
								setFieldsInfo((prev) => {
									prev[i] = valid;
									return [...prev];
								})
							}
							showErrors={showErrors}
							disableInteraction={doingStuff}
							disambigKey={i}
							fieldLabel={`${i}-fieldLabel`}
						/>
					</div>
				);
			})}

			<button
				type="submit"
				disabled={doingStuff}
				className="w-full rounded-sm bg-primary px-4 py-2 text-xs font-normal text-white uppercase"
			>
				Add Entry
			</button>
		</form>
	);
}
