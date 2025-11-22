import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,

      staleTime: 1000 * 60 * 5,  // 5 minutes fresh
      cacheTime: 1000 * 60 * 30, // 30 minutes cache

      retry: 1,                 // retry once if needed
      keepPreviousData: true,   // pagination smooth AF
    },
  },
});

export function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
