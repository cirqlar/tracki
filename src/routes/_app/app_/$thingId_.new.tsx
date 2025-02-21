import {
	experimental_useEffectEvent as useEffectEvent,
	FormEventHandler,
	useEffect,
	useState,
	Suspense,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { addEntry } from "@/components/db/entry";
import { getThing } from "@/components/db/thing";
import { FIELDS } from "@/components/fields";
import { Entry } from "@/components/db";
import { DateFieldData } from "@/components/fields/dates/types";

export const Route = createFileRoute("/_app/app_/$thingId_/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { thingId } = Route.useParams();
	const { data: thing } = useQuery({
		queryKey: ["thing", thingId],
		queryFn: () => getThing(Number(thingId)),
		staleTime: Infinity,
	});

	const [fields, setFields] = useState<Entry["fields"]>({});
	const [validity, setValidity] = useState<{ [key: string]: boolean }>({});
	const [showErrors, setShowErrors] = useState(false);

	const [loaded, setLoaded] = useState(false);
	const [doingStuff, setDoingStuff] = useState(false);

	const setDefaults = useEffectEvent(() => {
		const defFields: typeof fields = {};
		const defValids: typeof validity = {};

		for (let i = 0; i < thing!.fields.length; i++) {
			const curThing = thing!.fields[i];
			defFields[curThing.key] = FIELDS[curThing.field_id].getDefaultEntry(
				curThing.settings,
			);
			defValids[curThing.key] = true;
		}

		setFields(defFields);
		setValidity(defValids);
	});

	useEffect(() => {
		if (thing) {
			setLoaded(true);

			setDefaults();
		} else {
			setLoaded(false);
		}
	}, [thing]);

	const validate = () => {
		let anyErrors = false;
		for (let i = 0; i < thing!.fields.length; i++) {
			anyErrors ||= !validity[thing!.fields[i].key];
		}

		return !anyErrors;
	};

	const submit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		setShowErrors(false);
		setDoingStuff(true);

		if (validate()) {
			/* const entryId = */ await addEntry({
				thing_id: Number(thingId),
				created_for: (fields[thing!.fields[0].key] as DateFieldData)
					.date,
				fields: fields,
			});

			queryClient.invalidateQueries({ queryKey: ["entries", thingId] });

			navigate({
				to: "/app/$thingId",
				params: { thingId: thingId.toString() },
			});
		} else {
			setShowErrors(true);
		}

		setDoingStuff(false);
	};

	if (!thing || !loaded) {
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
			{/* 
			<div className="flex flex-col gap-2">
				<label htmlFor="defDate-fieldLabel">Date & Time</label>
				<Suspense fallback="Loading...">
					<dateField.AddEntryComponent
						fieldSettings={dateSettings!}
						defaultFieldData={defaultDateData}
						updateFieldData={setDDD}
						updateValidity={setDDV}
						showErrors={showErrors}
						disableInteraction={doingStuff}
						disambigKey="defDate"
						fieldLabel="defDate-fieldLabel"
					/>
				</Suspense>
			</div> */}

			{thing!.fields.map((field, i) => {
				const fieldType = FIELDS[field.field_id];

				return (
					<div className="flex flex-col gap-2" key={i + 1}>
						<label htmlFor={`${i}-fieldLabel`}>{field.name}</label>
						<Suspense fallback="Loading...">
							<fieldType.AddEntryComponent
								fieldSettings={field.settings}
								defaultFieldData={fields[field.key]}
								updateFieldData={(update) =>
									setFields((prev) => ({
										...prev,
										[field.key]: update,
									}))
								}
								updateValidity={(valid) =>
									setValidity((prev) => ({
										...prev,
										[field.key]: valid,
									}))
								}
								showErrors={showErrors}
								disableInteraction={doingStuff}
								disambigKey={i}
								fieldLabel={`${i}-fieldLabel`}
							/>
						</Suspense>
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
