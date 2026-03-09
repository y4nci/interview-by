import "server-only";

import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { FetchQueryOptions } from "@tanstack/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { AppRouter } from "@workspace/api";
import { cache } from "react";
import { makeQueryClient } from "./query-client";

export const getQueryClient = cache(makeQueryClient);

const link = new RPCLink({
  url: `${process.env.NEXT_PUBLIC_API_URL}/rpc`,
});

const client = createORPCClient<RouterClient<AppRouter>>(link);

export const orpc = createTanstackQueryUtils(client);

export const prefetch = (queryOptions: FetchQueryOptions) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(queryOptions);
};

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return <HydrationBoundary state={dehydrate(queryClient)}>{props.children}</HydrationBoundary>;
}
