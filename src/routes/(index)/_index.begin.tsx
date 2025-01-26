import LeftArrow from "@/components/icons/left-arrow";
import TrackiTransparent from "@/components/icons/logo-trans-nopad";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(index)/_index/begin")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex grow flex-col items-center md:justify-center">
			<Link
				to="/"
				className="absolute top-8 left-6 h-8 w-8 md:top-10 md:left-10"
			>
				<LeftArrow className="h-full" />
			</Link>

			<TrackiTransparent className="mt-5 mb-14 h-16 w-16 md:mt-0" />
			<h1 className="mb-3 text-2xl">Set a pin</h1>
			<p className="mb-4 text-xs">
				Tracki does this and that{" "}
				<a href="/" className="text-blue-500">
					Learn More
				</a>
				.
			</p>
			<div className="mb-6 h-10.5 w-60 rounded-sm bg-gray-400"></div>
			<button className="mb-4 rounded-sm bg-green-600 px-4 py-2 text-xs font-normal text-white uppercase">
				Continue
			</button>
		</div>
	);
}
