import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/app")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<h1 className="mb-8 text-center text-4xl/14">
				There's no<span className="text-primary">Thing</span> here
			</h1>
			<button className="mb-4 rounded-sm bg-primary px-4 py-2 text-xs font-normal text-white uppercase">
				Add a Thing
			</button>
		</div>
	);
}
