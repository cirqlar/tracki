import { getThing } from "@/components/db/thing";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

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
		<div>
			<h1>{thing.name}</h1>
		</div>
	);
}
