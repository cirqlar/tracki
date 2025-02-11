import { getThings } from "@/components/db/thing";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { format, fromUnixTime } from "date-fns";

export const Route = createFileRoute("/_app/app")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: things } = useQuery({
		queryKey: ["things"],
		queryFn: getThings,
	});

	if (!things || things.length === 0) {
		return (
			<div className="flex h-full w-full flex-col items-center justify-center">
				<h1 className="mb-8 text-center text-4xl/14">
					There's no<span className="text-primary">Thing</span> here
				</h1>
				<Link
					to="/app/new"
					className="mb-4 rounded-sm bg-primary px-4 py-2 text-xs font-normal text-white uppercase"
				>
					Add a Thing
				</Link>
			</div>
		);
	}

	return (
		<div className="flex h-full w-full flex-col gap-2">
			<h1 className="mb-6 text-4xl/14">
				Your <span className="text-primary">Thing</span>s
			</h1>
			{things.map((thing) => (
				<div
					key={thing.id}
					className="flex items-baseline justify-between"
				>
					<Link
						to="/app/$thingId"
						params={{ thingId: thing.id.toString() }}
						className="text-lg underline underline-offset-4"
					>
						{thing.name}
					</Link>
					<p className="text-sm text-gray-400">
						{format(fromUnixTime(thing.created_at), "PPP")}
					</p>
				</div>
			))}
			<Link
				to="/app/new"
				className="sticky bottom-0 my-4 flex items-center justify-center rounded-sm bg-primary px-4 py-2 font-normal text-white uppercase"
			>
				Add a Thing
			</Link>
		</div>
	);
}
