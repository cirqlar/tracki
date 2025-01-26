import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(index)/_index")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="flex h-full w-full flex-col items-center p-4 md:p-16">
			<Outlet />

			<div className="grow-0 text-center text-gray-400">
				<div className="mb-3 flex justify-center gap-3">
					<Link to="/about">About</Link>
					<a href="/">Github</a>
				</div>
				<p className="text-xs font-normal">
					©2025 Ibitoye Ayanfeoluwa
				</p>
			</div>
		</main>
	);
}
