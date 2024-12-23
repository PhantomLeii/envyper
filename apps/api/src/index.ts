import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";

import projects from "./routes/projects";
import envVars from "./routes/envVars";

const hono = new Hono().basePath("/api");

hono.use(etag(), logger());

hono.route("/projects", projects);
hono.route("/variables", envVars);

export const server = Bun.serve({
  fetch: hono.fetch,
});
