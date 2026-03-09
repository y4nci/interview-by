import { app } from "@/infrastructure/http/app";

export default {
  port: process.env.PORT ? Number.parseInt(process.env.PORT) : 3001,
  fetch: app.fetch,
};
