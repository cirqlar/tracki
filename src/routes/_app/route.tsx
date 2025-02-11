import { useEffect, useState } from "react";
import {
	createFileRoute,
	Link,
	Outlet,
	useRouter,
} from "@tanstack/react-router";

import LeftArrow from "@/components/icons/left-arrow";

export const Route = createFileRoute("/_app")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const [navbarOpen, setNavbarOpen] = useState(false);

	useEffect(() => {
		return router.subscribe("onBeforeNavigate", () => setNavbarOpen(false));
	}, [router]);

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
				<button
					className="absolute inset-0"
					onClick={() => setNavbarOpen(false)}
					aria-label="Close Navbar"
				></button>
				<div
					className={`relative flex h-full w-7/10 min-w-2xs flex-col items-start justify-between bg-green-300 p-6 transition-all duration-500 dark:bg-green-950 starting:-left-full ${navbarOpen ? "left-0" : "-left-full"}`}
				>
					<div className="flex flex-col items-start gap-2 text-lg">
						<Link to="/app">Dashboard</Link>
					</div>
					<div className="flex flex-col items-start gap-2 text-lg">
						<Link to="/app/about">About</Link>
						<a href="/">Github</a>
						<p className="mt-2 text-xs">
							©2025 Ibitoye Ayanfeoluwa
						</p>
						<button
							onClick={() => setNavbarOpen(false)}
							className="mt-2 rounded-sm bg-primary px-4 py-2 text-xs font-normal text-white uppercase"
						>
							Close Navbar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
