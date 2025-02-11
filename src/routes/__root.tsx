import ModalProvider from "@/components/modal";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
		},
	},
});

export const Route = createRootRoute({
	component: () => (
		<QueryClientProvider client={queryClient}>
			<ModalProvider>
				<Outlet />
				{/* <TanStackRouterDevtools /> */}
				{/* <ReactQueryDevtools /> */}
			</ModalProvider>
		</QueryClientProvider>
	),
});
