import LeftArrow from "@/components/icons/left-arrow";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_app")({
	component: RouteComponent,
});

function RouteComponent() {
	const [navbarOpen, setNavbarOpen] = useState(false);

	return (
		<div className="flex h-full w-full flex-col gap-6 p-6">
			<div className="grow-1 overflow-auto">
				<Outlet />
			</div>
			<div className="grow-0">
				<button className="h-8 w-8" onClick={() => setNavbarOpen(true)}>
					<LeftArrow className="h-full rotate-180" />
				</button>
			</div>

			<div
				className={`absolute top-0 left-0 h-full w-full transition-all transition-discrete duration-500 starting:bg-transparent ${navbarOpen ? "block bg-black/50" : "hidden"}`}
			>
				<div
					className={`relative h-full w-7/10 min-w-2xs bg-green-300 p-6 transition-all duration-500 dark:bg-green-950 starting:-left-full ${navbarOpen ? "left-0" : "-left-full"}`}
				>
					<p>Navbar</p>
					<button
						onClick={() => setNavbarOpen(false)}
						className="mx-auto mt-4 rounded-sm bg-primary px-4 py-2 text-xs font-normal text-white uppercase"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
