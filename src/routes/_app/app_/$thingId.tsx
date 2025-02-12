import { getThing } from "@/components/db/thing";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/app_/$thingId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { thingId } = Route.useParams();
	const { data: thing } = useQuery({
		queryKey: ["thing", thingId],
		queryFn: () => getThing(Number(thingId)),
	});

	if (!thing) {
		return (
			<div>
				<p>Loading</p>
			</div>
		);
	}

	return (
		<div className="flex h-full w-full flex-col gap-2">
			<h1 className="text-2xl">{thing.name}</h1>
			<Link
				to="/app/$thingId/new"
				params={{ thingId: thingId }}
				className="mb-4 w-fit rounded-sm bg-primary px-4 py-2 text-xs font-normal text-white uppercase"
			>
				Add an Entry
			</Link>
		</div>
	);
}
