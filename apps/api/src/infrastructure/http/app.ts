import { RPCHandler } from "@orpc/server/fetch";
import { Hono } from "hono";
import { appRouter } from "./orpc/routers/_app";

const handler = new RPCHandler(appRouter);

const app = new Hono();

app.use("/rpc/*", async (c) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/rpc",
    context: {},
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }

  return c.notFound();
});

export { app };
