import { getThing } from "@/components/db/thing";
import { FIELDS } from "@/components/fields";
import dateField from "@/components/fields/dates";
import { DateFieldSettings } from "@/components/fields/dates/types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
	experimental_useEffectEvent as useEffectEvent,
	FormEventHandler,
	useEffect,
	useMemo,
	useState,
	Suspense,
} from "react";

export const Route = createFileRoute("/_app/app_/$thingId_/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const { thingId } = Route.useParams();
	const { data: thing } = useQuery({
		queryKey: ["thing", thingId],
		queryFn: () => getThing(Number(thingId)),
	});

	const dateSettings = useMemo(() => {
		if (!thing) return undefined;

		return JSON.parse(thing.default_date_schema) as DateFieldSettings;
	}, [thing]);

	const fieldSettings = useMemo(() => {
		if (!thing) return [];

		return JSON.parse(thing.schema) as {
			id: number;
			name: string;
			fieldSettings: unknown;
		}[];
	}, [thing]);

	const [defaultDateValid, setDDV] = useState(true);
	const [defaultDateData, setDDD] = useState(
		dateField.getDefaultEntry(dateField.getDefaultFieldSettings()),
	);
	const [fieldsInfo, setFieldsInfo] = useState<
		{ valid: boolean; data: unknown }[]
	>([]);
	const [showErrors, setShowErrors] = useState(false);

	const [loaded, setLoaded] = useState(false);
	const [doingStuff, setDoingStuff] = useState(false);

	const setDefaults = useEffectEvent(() => {
		setDDD(dateField.getDefaultEntry(dateSettings!));
		setFieldsInfo(
			Array.from({ length: fieldSettings.length }, (_, i) => ({
				valid: true,
				data: FIELDS[fieldSettings[i].id].getDefaultEntry(
					fieldSettings[i].fieldSettings,
				),
			})),
		);
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
		let anyErrors = defaultDateValid;
		for (let i = 0; i < fieldsInfo.length; i++) {
			anyErrors ||= fieldsInfo[i].valid;
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
			</div>

			{fieldSettings.map((field, i) => {
				const fieldType = FIELDS[field.id];

				return (
					<div className="flex flex-col gap-2" key={i + 1}>
						<label htmlFor={`${i}-fieldLabel`}>{field.name}</label>
						<Suspense fallback="Loading...">
							<fieldType.AddEntryComponent
								fieldSettings={field.fieldSettings}
								defaultFieldData={fieldsInfo[i].data}
								updateFieldData={(update) =>
									setFieldsInfo((prev) => {
										prev[i].data = update;
										return [...prev];
									})
								}
								updateValidity={(valid) =>
									setFieldsInfo((prev) => {
										prev[i].valid = valid;
										return [...prev];
									})
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
