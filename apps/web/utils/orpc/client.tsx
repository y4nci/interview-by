"use client";

import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider, isServer } from "@tanstack/react-query";
import type { AppRouter } from "@workspace/api";
import { makeQueryClient } from "./query-client";

const link = new RPCLink({
  url: `${process.env.NEXT_PUBLIC_API_URL}/rpc`,
});

const client = createORPCClient<RouterClient<AppRouter>>(link);

export const orpc = createTanstackQueryUtils(client);

let browserQueryClient: QueryClient | undefined;

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
};

export function ORPCReactProvider(props: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
}
