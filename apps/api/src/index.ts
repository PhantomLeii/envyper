import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";

import projects from "./routes/projects";
import envVars from "./routes/envVars";
import webhooks from "./routes/webhooks";

const hono = new Hono().basePath("/api");

hono.use(etag(), logger());

hono.route("/projects", projects);
hono.route("/variables", envVars);
hono.route("/webhooks", webhooks);

export const server = Bun.serve({
  fetch: hono.fetch,
});
