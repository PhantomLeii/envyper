import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";

import projects from "./routes/projects";

const hono = new Hono()

hono.use(etag(), logger())

hono.route('/projects', projects)

export const server = Bun.serve({
  fetch: hono.fetch,
})

console.log(`Listening at ${server.url.href}`)