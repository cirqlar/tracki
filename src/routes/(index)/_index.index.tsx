import TrackiTransparent from "@/components/icons/logo-trans-nopad";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(index)/_index/")({
	component: Index,
});

function Index() {
	return (
		<div className="flex grow flex-col items-center justify-center">
			<TrackiTransparent className="mb-4 h-16 w-16" />
			<h1 className="mb-5 text-4xl">tracki</h1>
			<Link
				to="/begin"
				className="mb-4 rounded-sm bg-green-600 px-5 py-2 font-normal text-white uppercase"
			>
				Begin
			</Link>
			<button className="text-xs text-gray-400 underline">
				Link to something
			</button>
		</div>
	);
}
